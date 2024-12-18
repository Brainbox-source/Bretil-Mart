require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Define the Token schema
const tokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  expires_at: { type: Date, required: true }, // Expiration time of the access token
});

// Token model
const Token = mongoose.model('Token', tokenSchema);

// MongoDB connection URL
const MONGO_URI = process.env.MONGO_URI; // Use MONGO_URI from .env file

// Function to store the token in the database
const storeToken = async (tokenData) => {
  try {
    // Calculate the expiration date from `expires_in` (in seconds)
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000); // Convert seconds to milliseconds

    // Create a new token document
    const token = new Token({
      access_token: tokenData.access_token,
      expires_at: expiresAt,
    });

    // Save the token document to the database
    await token.save();
    console.log('Token saved successfully!');
  } catch (err) {
    console.error('Error saving token:', err);
  }
};

// Use the ACCESS_TOKEN from the .env file
const tokenData = {
  access_token: process.env.ACCESS_TOKEN, // Use ACCESS_TOKEN from .env
  token_type: "bearer",
  expires_in: 14400, // expires in 14400 seconds (4 hours)
};

// Connect to MongoDB and store the token
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    
    // Store the token
    await storeToken(tokenData);

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

// Start the script
connectDB();
