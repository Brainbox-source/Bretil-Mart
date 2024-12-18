const express = require('express');
const { upload, uploadFiles } = require('../controllers/fileController');

const router = express.Router();

// File upload route
router.post('/upload', upload, uploadFiles);  // 'upload' middleware handles file upload, then 'uploadFiles' controller
module.exports = router;


