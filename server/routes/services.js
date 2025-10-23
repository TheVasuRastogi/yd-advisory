const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all services (database-free mode)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Services data not available',
    data: {
      services: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

// Get featured services (database-free mode)
router.get('/featured', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Featured services not available',
    data: []
  });
});

// Get single service (database-free mode)
router.get('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Service data not available'
  });
});

// Create service (database-free mode)
router.post('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Service creation not available'
  });
});

// Update service (database-free mode)
router.put('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Service updates not available'
  });
});

// Delete service (database-free mode)
router.delete('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Service deletion not available'
  });
});

module.exports = router;