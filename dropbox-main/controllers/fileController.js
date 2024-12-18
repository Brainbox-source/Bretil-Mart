const multer = require('multer');
const fs = require('fs').promises;
const { Dropbox } = require('dropbox');
const { loadTokens, refreshAccessToken, saveTokens } = require('./dbxToken');

// Configure multer to save files to 'uploads' directory (if needed)
const upload = multer({ dest: 'uploads/' }).array('files'); // 'files' is the field name in the form

// Upload files and return Dropbox links
const uploadFiles = async (req, res) => {
  try {
    // Access the uploaded files from req.files (Multer stores files in req.files)
    const files = req.files; 

    console.log('Files:', files);  // Check if files are received

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Load the tokens from the database or cache
    let tokens = await loadTokens();

    // Check if the access token has expired
    if (new Date() >= tokens.expires_at) {
      const newAccessToken = await refreshAccessToken();
      tokens.access_token = newAccessToken;
      tokens.expires_at = new Date(Date.now() + 3600 * 1000); // Assuming the new access token expires in 1 hour
      await saveTokens(tokens.access_token, tokens.refresh_token, tokens.expires_at);
    }

    let dbx = new Dropbox({ accessToken: tokens.access_token });

    const fileUrls = [];

    // Upload files to Dropbox and get the direct links
    for (const file of files) {
      const filePath = file.path;
      console.log(`Uploading file: ${filePath}`);
      
      try {
        // Read file data from local storage
        const data = await fs.readFile(filePath);

        // Upload file to Dropbox
        const result = await dbx.filesUpload({ path: `/${file.originalname}`, contents: data });

        let directUrl;

        // Try to get existing shared link (if already exists)
        try {
          const sharedLinkResult = await dbx.sharingGetSharedLinkMetadata({
            url: `https://www.dropbox.com/s/${result.result.id}`
          });

          // If shared link exists, use it
          directUrl = sharedLinkResult.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        } catch (linkError) {
          // Handle the case where the shared link does not exist or an error occurs
          if (linkError.error_summary && linkError.error_summary.includes('shared_link_already_exists')) {
            console.log('Shared link already exists for this file');
            // Retrieve the existing shared link using the file path
            const createSharedLinkResult = await dbx.sharingCreateSharedLinkWithSettings({
              path: result.result.path_lower,
              settings: { requested_visibility: { '.tag': 'public' } } // Set visibility to public
            });

            // Use the direct URL of the shared link
            directUrl = createSharedLinkResult.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          } else {
            // Create a new shared link if none exists
            const createSharedLinkResult = await dbx.sharingCreateSharedLinkWithSettings({
              path: result.result.path_lower,
              settings: { requested_visibility: { '.tag': 'public' } } // Set visibility to public
            });

            // Use the direct URL of the shared link
            directUrl = createSharedLinkResult.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
            console.log(directUrl);
          }
        }

        // Add the direct URL to the list of file URLs
        fileUrls.push(directUrl);

        // Remove the file from local storage after uploading
        await fs.unlink(filePath);
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        return res.status(500).json({ error: 'Error uploading file to Dropbox.' });
      }
    }

    // Respond with the uploaded file URLs
    res.status(201).json({
      message: 'Files uploaded successfully.',
      urls: fileUrls,
    });

  } catch (err) {
    console.error('Error during file upload process:', err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

module.exports = { upload, uploadFiles };
