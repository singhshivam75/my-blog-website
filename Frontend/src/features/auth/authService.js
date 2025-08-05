import axios from 'axios';

const API_URL = 'http://localhost:8050/api/auth';

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    
    if (!user || user === 'undefined') return null;
    return JSON.parse(user);
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
    return null;
  }
};
