import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

// Register user
export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
