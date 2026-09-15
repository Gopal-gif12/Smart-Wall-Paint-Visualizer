const express = require('express');
const upload = require('../middleware/upload');
const { getFallbackStore, saveFallbackStore } = require('../config/db');

const router = express.Router();

router.post('/', upload.single('roomImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Increment uploads counter
    const store = getFallbackStore();
    if (store.stats) {
      store.stats.totalUploads = (store.stats.totalUploads || 0) + 1;
      saveFallbackStore();
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'Room photo uploaded successfully',
      imageUrl: fileUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to process image upload' });
  }
});

module.exports = router;
