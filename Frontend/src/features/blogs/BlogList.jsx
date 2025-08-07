import { useEffect, useState } from 'react';
import { getAllBlogs } from './blogService';
import BlogCard from '../../components/BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

const fetchBlogs = async (pageNum = 1) => {
  try {
    const data = await getAllBlogs(pageNum, 9);

    setBlogs(prev => pageNum === 1 ? data.blogs : [...prev, ...data.blogs]); // 🧠 Key fix
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-6xl px-6 py-20 mx-auto">
      <h2 className="mb-10 text-4xl font-bold text-center text-gray-900">📝 Latest Blog Posts</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : 0 < blogs.length ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {loadingMore ? 'Loading...' : 'Load More →'} 
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No blogs found. Please check back later.</p>
      )}
    </div>
  );
};

export default BlogList;
