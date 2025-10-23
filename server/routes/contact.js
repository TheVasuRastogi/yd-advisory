const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email template functions
const getEmailTemplate = (formType, firstName, lastName, company, subject, message, userEmail) => {
  const baseTemplate = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '',
    html: ''
  };

  switch (formType) {
    case 'Business Valuation Calculator':
      return {
        ...baseTemplate,
        subject: 'Your Business Valuation Journey Begins - YD Advisory',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="text-align: center; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px;">
              <h1 style="color: #14b8a6; margin-bottom: 10px; font-size: 28px;">YD Advisory</h1>
              <p style="color: #666; font-size: 16px; margin: 0;">Your trusted partner in business valuation</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Dear ${firstName},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Thank you for taking the time to use our Business Valuation Calculator. We understand that <strong>determining your business's true worth can be challenging</strong>, especially when you need reliable, professional insights to make critical decisions.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">If you're reading this, you've likely been searching for accurate valuation data and professional guidance. We've experienced similar challenges in the market, which is why we created YD Advisory to provide <strong>the most reliable business valuation services</strong> with the <strong>widest range of methodologies</strong> available.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our aim is to make business valuation more <strong>robust and comfortable</strong> for entrepreneurs and business owners like you, offering different analysis approaches, comprehensive reporting, and flexible engagement options.</p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
                <h3 style="color: #14b8a6; margin-bottom: 15px; font-size: 18px;">What happens next?</h3>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin-bottom: 15px;">Our valuation experts will carefully analyze your submitted data and conduct thorough market research specific to your industry. We'll prepare a comprehensive valuation report that provides you with actionable insights and professional recommendations.</p>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0;">While we're continuously improving our processes, we're <strong>dedicated to making you a satisfied client</strong>. Feel free to explore our services, and if you need any assistance, our team is here to help.</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our team will contact you within <strong>24 hours</strong> to discuss your specific valuation needs and provide a detailed timeline for your comprehensive business analysis.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0;">Best regards,<br><strong>Yashaswi Das</strong><br>Founder & CEO, YD Advisory</p>
            </div>
            
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="margin-bottom: 20px; font-size: 20px;">Ready to discuss your valuation?</h3>
              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> <strong>+971-528477349</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <strong>Yashaswi.das@ydadvisory.ae</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Website:</strong> <strong>www.ydadvisory.ae</strong></p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px; background: white; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;">This email was sent from YD Advisory. If you didn't request this valuation, please ignore this message.</p>
            </div>
          </div>
        `
      };

    case 'IP Valuation Calculator':
      return {
        ...baseTemplate,
        subject: 'Your IP Valuation Journey Begins - YD Advisory',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="text-align: center; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px;">
              <h1 style="color: #14b8a6; margin-bottom: 10px; font-size: 28px;">YD Advisory</h1>
              <p style="color: #666; font-size: 16px; margin: 0;">Intellectual Property Valuation Specialists</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Dear ${firstName},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Thank you for using our IP Valuation Calculator. We understand that <strong>valuing intellectual property can be complex and challenging</strong>, especially when you need reliable data to make informed decisions about your patents, trademarks, or other intangible assets.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">If you're reading this, you've likely been searching for accurate IP valuation methods and professional expertise. We've experienced similar challenges in the market, which is why we created YD Advisory to provide <strong>the most reliable IP valuation services</strong> with the <strong>widest range of methodologies</strong> available.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our aim is to make IP valuation more <strong>robust and comfortable</strong> for innovators and business owners like you, offering different analysis approaches, comprehensive asset assessment, and flexible engagement options.</p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
                <h3 style="color: #14b8a6; margin-bottom: 15px; font-size: 18px;">What happens next?</h3>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin-bottom: 15px;">Our IP specialists will carefully analyze your intellectual property portfolio and conduct thorough market research specific to your industry. We'll prepare a comprehensive valuation report that provides you with actionable insights and professional recommendations.</p>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0;">While we're continuously improving our processes, we're <strong>dedicated to making you a satisfied client</strong>. Feel free to explore our IP services, and if you need any assistance, our team is here to help.</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our IP valuation team will contact you within <strong>24 hours</strong> to discuss your intellectual property assets and provide a detailed timeline for your comprehensive analysis.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0;">Best regards,<br><strong>Yashaswi Das</strong><br>Founder & CEO, YD Advisory</p>
            </div>
            
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="margin-bottom: 20px; font-size: 20px;">Ready to discuss your IP valuation?</h3>
              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> <strong>+971-528477349</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <strong>Yashaswi.das@ydadvisory.ae</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Website:</strong> <strong>www.ydadvisory.ae</strong></p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px; background: white; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;">This email was sent from YD Advisory. If you didn't request this IP valuation, please ignore this message.</p>
            </div>
          </div>
        `
      };

    case 'Newsletter Subscription':
      return {
        ...baseTemplate,
        subject: 'Welcome to YD Advisory Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="text-align: center; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px;">
              <h1 style="color: #14b8a6; margin-bottom: 10px; font-size: 28px;">YD Advisory</h1>
              <p style="color: #666; font-size: 16px; margin: 0;">Financial Excellence Newsletter</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2d7a2d; margin-bottom: 20px; font-size: 24px;">Welcome to Our Newsletter!</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">Dear ${firstName},</p>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">Thank you for subscribing to the YD Advisory newsletter! You'll now receive our latest insights, market updates, and financial guidance directly in your inbox.</p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
                <h3 style="color: #14b8a6; margin-bottom: 15px; font-size: 18px;">What you'll receive:</h3>
                <ul style="color: #555; line-height: 1.8; font-size: 15px; margin: 0; padding-left: 20px;">
                  <li><strong>Market Insights</strong> - Latest financial market trends and analysis</li>
                  <li><strong>Investment Tips</strong> - Expert advice on portfolio management</li>
                  <li><strong>Business Updates</strong> - Company news and service announcements</li>
                  <li><strong>Educational Content</strong> - Financial literacy and planning guides</li>
                </ul>
              </div>
              
              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <h3 style="color: #f59e0b; margin-bottom: 15px; font-size: 18px;">Stay Connected</h3>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0;">Follow us on social media for real-time updates and join our community of financial professionals and investors.</p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="margin-bottom: 20px; font-size: 20px;">Connect With Us</h3>
              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> <strong>+971-528477349</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <strong>Yashaswi.das@ydadvisory.ae</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Website:</strong> <strong>www.ydadvisory.ae</strong></p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px; background: white; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;">You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
            </div>
          </div>
        `
      };

    default:
      return {
        ...baseTemplate,
        subject: 'Thank you for reaching out - YD Advisory',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="text-align: center; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px;">
              <h1 style="color: #14b8a6; margin-bottom: 10px; font-size: 28px;">YD Advisory</h1>
              <p style="color: #666; font-size: 16px; margin: 0;">Your trusted partner in financial excellence</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Dear ${firstName},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Thank you for taking the time to reach out to YD Advisory. We understand that <strong>finding the right financial advisory partner can be challenging</strong>, especially when you need reliable expertise to make critical business decisions.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">If you're reading this, you've likely been searching for professional financial guidance and trustworthy advisory services. We've experienced similar challenges in the market, which is why we created YD Advisory to provide <strong>the most reliable financial services</strong> with the <strong>widest range of expertise</strong> available.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our aim is to make financial advisory services more <strong>accessible and comfortable</strong> for business owners and entrepreneurs like you, offering different service approaches, comprehensive analysis, and flexible engagement options.</p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
                <h3 style="color: #14b8a6; margin-bottom: 15px; font-size: 18px;">What happens next?</h3>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin-bottom: 15px;">Our team will carefully review your inquiry regarding <strong>"${subject}"</strong> and prepare a personalized response tailored to your specific needs. We'll provide you with detailed information and actionable recommendations.</p>
                <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0;">While we're continuously improving our services, we're <strong>dedicated to making you a satisfied client</strong>. Feel free to explore our offerings, and if you need any assistance, our team is here to help.</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Our team will contact you within <strong>24 hours</strong> to discuss your specific requirements and provide a detailed timeline for addressing your needs.</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0;">Best regards,<br><strong>Yashaswi Das</strong><br>Founder & CEO, YD Advisory</p>
            </div>
            
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="margin-bottom: 20px; font-size: 20px;">Ready to discuss your needs?</h3>
              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> <strong>+971-528477349</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <strong>Yashaswi.das@ydadvisory.ae</strong></p>
                </div>
                <div style="text-align: center;">
                  <p style="margin: 5px 0; font-size: 16px;"><strong>Website:</strong> <strong>www.ydadvisory.ae</strong></p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px; background: white; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;">This email was sent from YD Advisory. If you didn't request this, please ignore this message.</p>
            </div>
          </div>
        `
      };
  }
};

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

// Contact form submission
router.post('/submit', [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('serviceInterest').optional().isIn(['investment-management', 'financial-planning', 'risk-assessment', 'tax-planning', 'estate-planning', 'business-consulting', 'other', 'IP Valuation', 'Business Valuation']),
  body('budget').optional().isIn(['under-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1m', 'over-1m', 'not-specified']),
  body('timeline').optional().isIn(['immediate', '1-3-months', '3-6-months', '6-12-months', 'over-1-year', 'not-specified']),
  body('formType').optional().trim().isLength({ max: 100 }).withMessage('Form type cannot exceed 100 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      subject,
      message,
      serviceInterest,
      budget,
      timeline,
      formType
    } = req.body;

    // Log contact submission (no database storage)
    console.log('New contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      company,
      subject,
      message,
      serviceInterest,
      budget,
      timeline,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });

    // Send email notification to admin (if email is configured)
    if (transporter) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New ${formType || 'Contact'} Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #14b8a6; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">New ${formType || 'Contact'} Form Submission</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d7a2d; margin-bottom: 15px;">Contact Information</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Form Type:</strong> ${formType || 'General Contact'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d7a2d; margin-bottom: 15px;">Inquiry Details</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Service Interest:</strong> ${serviceInterest || 'Not specified'}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d7a2d; margin-bottom: 15px;">Message</h3>
              <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #14b8a6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 14px;"><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
            <p style="color: #666; font-size: 14px;"><strong>IP Address:</strong> ${req.ip}</p>
          </div>
        `
      };

      // Get custom email template based on form type
      const autoReplyTemplate = getEmailTemplate(formType, firstName, lastName, company, subject, message, email);
      const autoReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: autoReplyTemplate.subject,
        html: autoReplyTemplate.html
      };

      try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(autoReplyOptions);
        console.log(`Email sent successfully for ${formType || 'contact'} form submission from ${email}`);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Email not configured - contact form submitted without email notification');
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        submittedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Database-free endpoints - return mock data or simple responses
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Database-free mode: Contact data not available',
    data: {
      contacts: [],
      pagination: {
        current: 1,
        pages: 0,
        total: 0
      }
    }
  });
});

router.get('/:id', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Contact data not available'
  });
});

router.patch('/:id/status', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Contact updates not available'
  });
});

router.patch('/:id/read', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Database-free mode: Contact updates not available'
  });
});

module.exports = router;
