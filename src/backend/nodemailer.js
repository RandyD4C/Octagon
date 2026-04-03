import nodemailer from 'nodemailer';

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true if using port 465
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // Your App Password
  },
});

/**
 * Sends an email from the Octagon contact form.
 * @param {Object} options - Email options
 * @param {string|string[]} options.to - Receiver email(s). Accepts a single email, comma-separated string, or an array.
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Email body text
 * @param {string} [options.html] - Optional HTML body
 * @param {string|string[]} [options.cc] - Optional CC recipient(s). Same format as `to`.
 * @param {string|string[]} [options.bcc] - Optional BCC recipient(s). Same format as `to`.
 * @param {string} [options.replyTo] - Optional reply-to address (user email)
 * @param {Array} [options.attachments] - Optional attachments
 */
export const sendEmail = async ({ to, subject, text, html, cc, bcc, replyTo, attachments }) => {
  const mailOptions = {
    from: `"Octagon Contact" <${process.env.EMAIL_USER}>`, // professional sender
    to,
    subject,
    text,
    html,
    ...(cc ? { cc } : {}),
    ...(bcc ? { bcc } : {}),
    attachments: attachments || [],
    replyTo: replyTo || process.env.EMAIL_USER, // reply goes to user if provided
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
