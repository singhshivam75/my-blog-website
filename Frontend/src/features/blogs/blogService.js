import axios from 'axios';
import { getToken } from '../auth/authService';

const API_URL = 'http://localhost:8050/api/blog';

export const getAllBlogs = async (page = 1, limit = 2) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateBlogById = async (id, blogData) => {
  const token = getToken();
  const res = await axios.put(`${API_URL}/${id}`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteBlogById = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createBlog = async (blogData) => {
  const token = getToken();
  const res = await axios.post(API_URL, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getMyBlogs = async (page = 1, limit = 6) => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/my-blogs?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return res.data;
};

export const patchPublishStatues = async (blogId) => {
  const token = getToken();
  const res = await axios.patch(
    `${API_URL}/${blogId}/toggle-publish`, 
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getSearchedBlogs = async (page = 1, limit = 10, query = '') => {
  const res = await axios.get(`/api/blog?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  return res.data;
};