import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const res = await axios.get(`http://localhost:8050/api/blog/search?query=${query}`);
      onResults(res.data.blogs);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs..."
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded cursor-pointer">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
