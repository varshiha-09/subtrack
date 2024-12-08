import axios from 'axios';

const API_URL = 'http://localhost:5001/api/plaid';

export const createLinkToken = async (userId) => {
  const response = await axios.post(`${API_URL}/create_link_token`, { userId });
  return response.data.link_token;
};

export const exchangePublicToken = async (publicToken) => {
  const response = await axios.post(`${API_URL}/exchange_public_token`, { public_token: publicToken });
  return response.data;
};

export const getTransactions = async (accessToken, userId) => {
  if (!accessToken || !userId) {
    throw new Error('Missing access token or user ID.');
  }

  try {
    const response = await axios.post('http://localhost:5001/api/plaid/transactions', {
      access_token: accessToken,
      userId,
    });
    return response.data.transactions; // Ensure all transactions are returned
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    throw new Error('Failed to fetch transactions.');
  }
};

