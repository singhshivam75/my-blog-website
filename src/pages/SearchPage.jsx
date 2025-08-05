import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';

const SearchPage = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <SearchBar onResults={setResults} />

      <div className="mt-6 space-y-4">
        {results.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          results.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default SearchPage;