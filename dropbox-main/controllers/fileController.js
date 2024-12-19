const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Dropbox } = require('dropbox');
const { loadTokens, refreshAccessToken, saveTokens } = require('./dbxToken');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

// Multer Middleware
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit files to 20 MB
}).array('files');

// Upload files and return Dropbox links
const uploadFiles = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Load the tokens from the database or cache
    let tokens = await loadTokens();
    if (new Date() >= tokens.expires_at) {
      const newAccessToken = await refreshAccessToken();
      tokens.access_token = newAccessToken;
      tokens.expires_at = new Date(Date.now() + 3600 * 1000); // Assuming 1 hour expiry
      await saveTokens(tokens.access_token, tokens.refresh_token, tokens.expires_at);
    }

    const dbx = new Dropbox({ accessToken: tokens.access_token });
    const fileUrls = [];

    for (const file of files) {
      const filePath = file.path;
      console.log(`Uploading file: ${filePath}`);

      try {
        // Read file data from local storage
        const data = await fs.promises.readFile(filePath);

        // Upload file to Dropbox
        const result = await dbx.filesUpload({
          path: `/${file.filename}`,
          contents: data,
        });

        // Generate a shared link
        const sharedLinkResult = await dbx.sharingCreateSharedLinkWithSettings({
          path: result.result.path_lower,
          settings: { requested_visibility: { '.tag': 'public' } },
        });

        console.log('Shared link result:', sharedLinkResult);

        // Extract the direct download URL
        const directUrl = sharedLinkResult.result.url.replace(
          'www.dropbox.com',
          'dl.dropboxusercontent.com'
        );
        fileUrls.push(directUrl);

        // Remove the file from local storage after uploading
        await fs.promises.unlink(filePath);
      } catch (uploadError) {
        console.error('Error uploading file to Dropbox:', uploadError);
        return res
          .status(500)
          .json({ error: 'Error uploading file to Dropbox.' });
      }
    }

    // Respond with the uploaded file URLs
    res.status(201).json({
      message: 'Files uploaded successfully.',
      urls: fileUrls,
    });
  } catch (err) {
    console.error('Error during file upload process:', err);
    res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

module.exports = { upload, uploadFiles };
