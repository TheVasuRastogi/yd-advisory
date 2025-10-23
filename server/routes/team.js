const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all team members (database-free mode)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Team data not available',
    data: {
      teamMembers: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

// Get single team member (database-free mode)
router.get('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Team member data not available'
  });
});

// Create team member (database-free mode)
router.post('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Team member creation not available'
  });
});

// Update team member (database-free mode)
router.put('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Team member updates not available'
  });
});

// Delete team member (database-free mode)
router.delete('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Team member deletion not available'
  });
});

module.exports = router;