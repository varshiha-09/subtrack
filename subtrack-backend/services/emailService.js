const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Add your email in .env
    pass: process.env.EMAIL_PASS, // Add app-specific password in .env
  },
});

exports.sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email.');
  }
};
