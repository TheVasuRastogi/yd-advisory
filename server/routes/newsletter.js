const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email transporter configuration (optional - only if email is configured)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Newsletter subscription (database-free mode)
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, firstName, lastName } = req.body;

    // Log newsletter subscription (no database storage)
    console.log('New newsletter subscription:', {
      email,
      firstName,
      lastName,
      timestamp: new Date().toISOString()
    });

    // Send welcome email (if email is configured)
    if (transporter) {
      const welcomeEmail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to YD Advisory Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d7a2d;">Welcome to YD Advisory Newsletter!</h2>
            <p>Dear ${firstName || 'Subscriber'},</p>
            <p>Thank you for subscribing to our newsletter. You'll receive the latest updates on financial advisory services, market insights, and exclusive content.</p>
            <p>Stay tuned for valuable financial guidance and expert advice!</p>
            <hr style="margin: 30px 0;">
            <p><strong>YD Advisory Team</strong><br>
            <strong>Phone:</strong> +971-528477349<br>
            <strong>Email:</strong> Yashaswi.das@ydadvisory.ae<br>
            <strong>Website:</strong> www.ydadvisory.com</p>
          </div>
        `
      };

      try {
        await transporter.sendMail(welcomeEmail);
      } catch (emailError) {
        console.error('Newsletter email error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Email not configured - newsletter subscription without email notification');
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: {
        subscribedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.'
    });
  }
});

// Get all subscribers (database-free mode)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Newsletter subscribers not available',
    data: {
      subscribers: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

// Unsubscribe (database-free mode)
router.post('/unsubscribe', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Unsubscribe not available'
  });
});

module.exports = router;