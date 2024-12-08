const express = require('express');
const subscriptionService = require('../services/subscriptionService');
const emailService = require('../services/emailService');
const router = express.Router();
const subscriptionKeywords = require('../data/subscriptionKeywords');

router.get('/:userId', async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptions(req.params.userId);

    // Add corresponding subscription links from keywords
    const enrichedSubscriptions = subscriptions.map((sub) => {
      const keyword = subscriptionKeywords.find(
        (keyword) => keyword.name.toLowerCase() === sub.name.toLowerCase()
      );
      return { ...sub.toObject(), link: keyword ? keyword.link : null }; // Use .toObject() to strip Mongoose metadata
    });

    res.json({ success: true, subscriptions: enrichedSubscriptions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Add Subscription
router.post('/:userId', async (req, res) => {
  try {
    const subscription = await subscriptionService.addSubscription(req.params.userId, req.body);
    res.status(201).json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Send Subscription Email
router.post('/send_email/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user's subscriptions
    const subscriptions = await subscriptionService.getSubscriptions(userId);

    if (!subscriptions.length) {
      return res.status(404).json({ success: false, error: 'No subscriptions found for the user.' });
    }

    // Generate email content
    const emailContent = `
      <h1>Your Subscriptions</h1>
      <ul>
        ${subscriptions
          .map(
            (sub) => `
          <li>
            <p><strong>Name:</strong> ${sub.name}</p>
            <p><strong>Amount:</strong> $${sub.amount.toFixed(2)}</p>
            <p><strong>Last Payment Date:</strong> ${new Date(sub.lastPaymentDate).toLocaleDateString()}</p>
            <p><strong>Next Payment Date:</strong> ${new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
          </li>
        `
          )
          .join('')}
      </ul>
    `;

    // Fetch user's email
    const user = await subscriptionService.getUser(userId);
    if (!user || !user.email) {
      return res.status(404).json({ success: false, error: 'User email not found.' });
    }

    // Send email
    await emailService.sendEmail(user.email, 'Your Subscription Details', emailContent);

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending subscription email:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
