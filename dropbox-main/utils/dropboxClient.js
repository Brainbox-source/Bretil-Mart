const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

// Upload file to Dropbox and get the raw link
const uploadToDropbox = async (fileBuffer, filePath) => {
  try {
    // Upload the file to Dropbox
    const response = await dbx.filesUpload({
      path: filePath,
      contents: fileBuffer,
    });

    // Create a shared link for the file
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.result.path_display,
    });

    // Convert the shared link to a direct download link
    const rawLink = sharedLink.result.url.replace('dl=0', 'raw=1');

    return rawLink;
  } catch (err) {
    console.error('Dropbox upload error:', err);
    throw err;
  }
};

module.exports = { uploadToDropbox };
