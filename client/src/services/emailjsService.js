import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_xvoqsts'; // Your actual EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_yd_advisory'; // Default template - update when you create your template
const EMAILJS_PUBLIC_KEY = 'WW0GtpuuTn0fwRfT6'; // Your actual EmailJS public key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const emailjsService = {
  // Send contact form email
  sendContactForm: async (formData) => {
    try {
      console.log('EmailJS: Attempting to send email with data:', formData);
      console.log('EmailJS: Service ID:', EMAILJS_SERVICE_ID);
      console.log('EmailJS: Template ID:', EMAILJS_TEMPLATE_ID);
      console.log('EmailJS: Public Key:', EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        subject: formData.subject,
        service_interest: formData.serviceInterest || 'General Inquiry',
        message: formData.message,
        form_type: formData.formType || 'Contact Form',
        to_name: 'YD Advisory Team'
      };

      console.log('EmailJS: Template params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS: Success response:', response);

      return {
        success: true,
        message: 'Email sent successfully!',
        messageId: response.text
      };
    } catch (error) {
      console.error('EmailJS Error Details:', {
        error: error,
        message: error.message,
        text: error.text,
        status: error.status
      });
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email. Please try again.';
      
      if (error.status === 400) {
        errorMessage = 'Invalid email configuration. Please contact support.';
      } else if (error.status === 401) {
        errorMessage = 'Email service authentication failed. Please contact support.';
      } else if (error.status === 404) {
        errorMessage = 'Email template not found. Please contact support.';
      } else if (error.text) {
        errorMessage = `Email error: ${error.text}`;
      }

      return {
        success: false,
        message: errorMessage,
        error: error.text || error.message,
        status: error.status
      };
    }
  },

  // Send business valuation calculator form
  sendValuationForm: async (formData) => {
    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        subject: 'Business Valuation Calculator Submission',
        service_interest: 'Business Valuation',
        message: `Business Valuation Calculator Results:\n\n${JSON.stringify(formData, null, 2)}`,
        form_type: 'Business Valuation Calculator',
        to_name: 'YD Advisory Team'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return {
        success: true,
        message: 'Valuation request sent successfully!',
        messageId: response.text
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: 'Failed to send valuation request. Please try again.',
        error: error.text || error.message
      };
    }
  },

  // Send IP valuation calculator form
  sendIPValuationForm: async (formData) => {
    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        subject: 'IP Valuation Calculator Submission',
        service_interest: 'IP Valuation',
        message: `IP Valuation Calculator Results:\n\n${JSON.stringify(formData, null, 2)}`,
        form_type: 'IP Valuation Calculator',
        to_name: 'YD Advisory Team'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return {
        success: true,
        message: 'IP valuation request sent successfully!',
        messageId: response.text
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: 'Failed to send IP valuation request. Please try again.',
        error: error.text || error.message
      };
    }
  },

  // Send newsletter subscription
  sendNewsletterSubscription: async (email) => {
    try {
      const templateParams = {
        from_name: 'Newsletter Subscriber',
        from_email: email,
        phone: 'Not provided',
        company: 'Not provided',
        subject: 'Newsletter Subscription',
        service_interest: 'Newsletter',
        message: 'User subscribed to newsletter',
        form_type: 'Newsletter Subscription',
        to_name: 'YD Advisory Team'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return {
        success: true,
        message: 'Newsletter subscription successful!',
        messageId: response.text
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: 'Failed to subscribe to newsletter. Please try again.',
        error: error.text || error.message
      };
    }
  }
};

// Export both named and default for flexibility
export default emailjsService;
