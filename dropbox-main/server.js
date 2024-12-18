require('dotenv').config();
const express = require('express');
const cors = require('./middlewares/corsMiddleware');
const fileRoutes = require('./routes/fileRoutes');
const connectDB = require('./config/db'); // Import MongoDB connection

const app = express();

// Middleware
app.use(express.json());
app.use(cors);

// Connect to MongoDB
connectDB();


// Routes
app.use('/api/files', fileRoutes);

// Global Error Handler Middleware (proper logging)
app.use((err, req, res, next) => {
  // Log error details for debugging (including the stack trace)
  console.error(`Error occurred: ${err.message}`);
  console.error(err.stack);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Respond to the client with the error message and status
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Something went wrong on the server. Please try again later.'
        : err.message,
  });

});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
