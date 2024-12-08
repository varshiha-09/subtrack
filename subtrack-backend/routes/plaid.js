const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const plaidClient = require('../services/plaidService');
const Transaction = require('../models/Transaction');
const Subscription = require('../models/Subscription');
const subscriptionKeywords = require('../data/subscriptionKeywords');

// Utility function to calculate the next payment date
const calculateNextPaymentDate = (lastPaymentDate) => {
  return dayjs(lastPaymentDate).add(1, 'month').toISOString();
};

// Create Link Token
router.post('/create_link_token', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId' });
    }

    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId.toString() },
      client_name: 'SubTrack',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating link token:', error.message);
    res.status(500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Exchange Public Token
router.post('/exchange_public_token', async (req, res) => {
  try {
    const { public_token } = req.body;

    if (!public_token) {
      return res.status(400).json({ error: 'Missing public_token in request body' });
    }

    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    res.json({
      access_token: response.data.access_token,
      item_id: response.data.item_id,
    });
  } catch (error) {
    console.error('Error exchanging public token:', error.message);
    res.status(500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Fetch and process transactions
router.post('/transactions', async (req, res) => {
  try {
    const { access_token, userId } = req.body;

    if (!access_token || !userId) {
      return res.status(400).json({ error: 'Missing access_token or userId in request body' });
    }

    const startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'); // Extend the range to 1 year
    const endDate = dayjs().format('YYYY-MM-DD');

    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
      options: { count: 500, offset: 0 },
    });

    const transactions = response.data.transactions;

    // Process and store transactions
    const subscriptions = [];
    for (const tx of transactions) {
      const matchingSubscription = subscriptionKeywords.find(sub =>
        tx.name.toLowerCase().includes(sub.keyword)
      );

      if (matchingSubscription) {
        // Check if the subscription already exists
        const existingSubscription = await Subscription.findOne({
          userId,
          name: matchingSubscription.name,
        });

        if (!existingSubscription) {
          const newSubscription = new Subscription({
            userId,
            name: matchingSubscription.name,
            amount: tx.amount,
            lastPaymentDate: tx.date,
            nextPaymentDate: calculateNextPaymentDate(tx.date),
          });

          await newSubscription.save();
          subscriptions.push(newSubscription);
        }
      }

      // Save or update the transaction in the database
      await Transaction.updateOne(
        { transactionId: tx.transaction_id },
        {
          userId,
          transactionId: tx.transaction_id,
          name: tx.name,
          amount: tx.amount,
          date: tx.date,
          category: tx.category || [],
          paymentChannel: tx.payment_channel || 'unknown',
        },
        { upsert: true }
      );
    }

    res.json({
      transactions: await Transaction.find({ userId }),
      subscriptions,
      message: 'Transactions processed successfully',
    });
  } catch (error) {
    console.error('Error processing transactions:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Identify Recurring Transactions
router.post('/identify_recurring', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in request body' });
    }

    const transactions = await Transaction.find({ userId });

    const grouped = transactions.reduce((acc, tx) => {
      acc[tx.name] = acc[tx.name] || [];
      acc[tx.name].push(tx);
      return acc;
    }, {});

    const recurring = [];
    for (const [name, txs] of Object.entries(grouped)) {
      if (txs.length < 2) continue;

      const sortedTxs = txs.sort((a, b) => new Date(a.date) - new Date(b.date));
      const intervals = sortedTxs.slice(1).map((tx, i) =>
        new Date(tx.date) - new Date(sortedTxs[i].date)
      );

      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const isRecurring = intervals.every(
        (interval) => Math.abs(interval - avgInterval) < 3 * 24 * 60 * 60 * 1000 // 3-day variance
      );

      if (isRecurring) {
        recurring.push({
          name,
          amount: txs[0].amount,
          lastPaymentDate: new Date(sortedTxs[sortedTxs.length - 1].date),
        });
      }
    }

    const subscriptions = [];
    for (const r of recurring) {
      const subscription = await Subscription.findOneAndUpdate(
        { userId, name: r.name },
        {
          userId,
          name: r.name,
          amount: r.amount,
          lastPaymentDate: r.lastPaymentDate,
          nextPaymentDate: calculateNextPaymentDate(r.lastPaymentDate),
        },
        { upsert: true, new: true }
      );
      subscriptions.push(subscription);
    }

    res.json({ success: true, subscriptions });
  } catch (error) {
    console.error('Error identifying recurring transactions:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
