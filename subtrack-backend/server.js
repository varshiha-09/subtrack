const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./services/mongoService');
const plaidRoutes = require('./routes/plaid');
const subscriptionRoutes = require('./routes/subscriptions');
const authRoutes = require('./routes/auth');

require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plaid', plaidRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
