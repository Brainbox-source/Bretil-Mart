require('isomorphic-fetch'); // Install this package using 'npm install isomorphic-fetch'

// Replace these with your Dropbox app details
const APP_KEY = 'j5o71t1nprjuoy7'; // Replace with your Dropbox App Key
const APP_SECRET = 'd56ioknmo71t4wx'; // Replace with your Dropbox App Secret
const AUTHORIZATION_CODE = 'F239n6Hw65QAAAAAAAAAL8E2fDjcxJODreFuRF37W00'; // Replace with your Authorization Code

// Function to get the Dropbox refresh token
const getDropboxRefreshToken = async () => {
  const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${APP_KEY}:${APP_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get refresh token: ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log('Access Token and Refresh Token Response:', data);

    // Log the refresh token explicitly
    if (data.refresh_token) {
      console.log('Refresh Token:', data.refresh_token);
    } else {
      console.warn('Refresh token not found in the response.');
    }

    return data;
  } catch (error) {
    console.error('Error obtaining Dropbox refresh token:', error.message);
  }
};

// Call the function
getDropboxRefreshToken();
