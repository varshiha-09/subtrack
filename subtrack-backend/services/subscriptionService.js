const Subscription = require('../models/Subscription');
const dayjs = require('dayjs');

// Predict the next payment date
const predictNextPaymentDate = (lastPaymentDate) => {
  return dayjs(lastPaymentDate).add(1, 'month').toDate();
};

// Fetch all subscriptions for a user
exports.getSubscriptions = async (userId) => {
  return await Subscription.find({ userId });
};

// Add a new subscription
exports.addSubscription = async (userId, subscriptionData) => {
  const { name, amount, lastPaymentDate } = subscriptionData;
  const nextPaymentDate = predictNextPaymentDate(lastPaymentDate);

  const subscription = new Subscription({
    userId,
    name,
    amount,
    lastPaymentDate,
    nextPaymentDate,
  });

  await subscription.save();
  return subscription;
};


const User = require('../models/User');

// Fetch user details
exports.getUser = async (userId) => {
  return await User.findById(userId);
};
