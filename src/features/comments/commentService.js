import axios from 'axios';
import { getToken } from '../auth/authService';

const API_URL = 'http://localhost:8050/api/comment';

export const getCommentsByBlogId = async (blogId) => {
  const res = await axios.get(`${API_URL}/${blogId}`);
  return res.data;
};

export const createComment = async (blogId, content) => {
  const token = getToken();

  const res = await axios.post(
    `${API_URL}/${blogId}`,
    { text: content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};
