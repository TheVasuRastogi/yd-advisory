const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all portfolio items (database-free mode)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Portfolio data not available',
    data: {
      portfolio: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

// Get single portfolio item (database-free mode)
router.get('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Portfolio item data not available'
  });
});

// Create portfolio item (database-free mode)
router.post('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Portfolio item creation not available'
  });
});

// Update portfolio item (database-free mode)
router.put('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Portfolio item updates not available'
  });
});

// Delete portfolio item (database-free mode)
router.delete('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Portfolio item deletion not available'
  });
});

module.exports = router;