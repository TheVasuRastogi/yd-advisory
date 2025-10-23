const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all blog posts (database-free mode)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Blog data not available',
    data: {
      posts: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

// Get single blog post (database-free mode)
router.get('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Blog post data not available'
  });
});

// Create blog post (database-free mode)
router.post('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Blog post creation not available'
  });
});

// Update blog post (database-free mode)
router.put('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Blog post updates not available'
  });
});

// Delete blog post (database-free mode)
router.delete('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Blog post deletion not available'
  });
});

module.exports = router;