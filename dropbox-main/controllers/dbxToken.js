const mongoose = require('mongoose');
const axios = require('axios');

// Define a schema for storing tokens
const tokenSchema = new mongoose.Schema({
    access_token: { type: String, required: true },
    expires_at: { type: Date, required: true } // Expiration time of the access token
});

const Token = mongoose.model('Token', tokenSchema);

// Load tokens from MongoDB
const loadTokens = async () => {
    const tokenData = await Token.findOne({});
    if (!tokenData) {
        throw new Error('Tokens not found');
    }
    return tokenData;
};

// Save tokens to MongoDB
const saveTokens = async (accessToken, expiresAt) => {
    const tokenData = await Token.findOneAndUpdate({}, {
        access_token: accessToken,
        expires_at: expiresAt
    }, { upsert: true, new: true });
    return tokenData;
};

// Refresh the access token
const refreshAccessToken = async () => {
    const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;

    if (!refreshToken) {
        throw new Error('Refresh token not found in environment variables');
    }

    const response = await axios.post('https://api.dropbox.com/oauth2/token', null, {
        params: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.DROPBOX_CLIENT_ID,
            client_secret: process.env.DROPBOX_CLIENT_SECRET
        }
    });

    const { access_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);
    await saveTokens(access_token, expiresAt);

    return access_token;
};

module.exports = { loadTokens, saveTokens, refreshAccessToken };