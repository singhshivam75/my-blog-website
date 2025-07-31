import { useEffect, useState } from 'react';
import { getAllBlogs } from './blogService';
import BlogCard from '../../components/BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl px-6 py-20 mx-auto">
      <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">📝 Latest Blog Posts</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found. Please check back later.</p>
      )}
    </div>
  );
};

export default BlogList;
