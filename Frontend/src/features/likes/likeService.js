import axios from 'axios';
import { getToken } from '../auth/authService';

const API_URL = 'http://localhost:8050/api/likes';

export const getLikesCount = async (blogId) => {
  const res = await axios.get(`${API_URL}/${blogId}/count`);
  return res.data.totalLikes;
};

export const toggleLike = async (blogId) => {
  const token = getToken();
  const res = await axios.post(`${API_URL}/${blogId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getLikedUsers = async (blogId) => {
  const res = await axios.get(`${API_URL}/${blogId}/users`);
  return res.data;
};
