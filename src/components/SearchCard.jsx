import React, { useState, useEffect } from 'react';
import { getSearchedBlogs } from '../features/blogs/blogService';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!debouncedTerm) {
        setBlogs([]);
        return;
      }

      setLoading(true);
      try {
        const data = await getSearchedBlogs(1, 10, debouncedTerm);
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error('Search failed:', err);
        setBlogs([]);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [debouncedTerm]);

  return (
    <div className="max-w-2xl px-4 mx-auto mt-10">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search blogs by title, description or keywords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className="mt-4 text-center text-gray-500">Searching...</p>
      ) : (
        <div className="mt-6 space-y-4">
          {blogs.length === 0 && debouncedTerm && (
            <p className="text-center text-gray-400">No results found.</p>
          )}
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 transition border border-gray-200 rounded-md shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{blog.description}</p>
              <div className="mt-2 text-sm text-blue-600">Author: {blog.author?.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
