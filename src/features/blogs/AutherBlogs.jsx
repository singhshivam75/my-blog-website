import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteBlogById, getMyBlogs } from './blogService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../auth/authService';

const AutherBlogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getMyBlogs();
        setBlogs(data.blogs || []);
      } catch (err) {
        toast.error('Failed to fetch your blogs.', err)
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b._id === id);
    if (!blog) return;

    if ((currentUser?.id || currentUser?._id)?.toString() !== blog.author?._id?.toString()) {
      toast.error('You do not have permission to delete the blog.')
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this blog titled "${blog.title}"?`
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteBlogById(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success('Blog deleted successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className='py-10 text-lg text-center text-gray-600'>Loading your blogs...</div>
  }

  return (
    <div className='max-w-5xl px-4 py-10 mx-auto'>
      <h2 className='mb-6 text-3xl font-bold'>My blogs</h2>

      {blogs.length === 0 ? (
        <p className='text-gray-500'>You haven't written any blog yet.</p>
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className='relative flex flex-col p-5 transition-all bg-white border shadow-sm rounded-xl hover:shadow-md'
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='object-cover w-full h-48 mb-4 rounded-md'
                />
              )}
              <h3 className='mb-2 text-xl font-semibold'>{blog.title}</h3>
              <p className="mb-4 text-sm text-gray-600">
                {(blog.description || '').slice(0, 100)}...
              </p>
              <div className="flex items-center justify-between pt-4 pb-2 mt-auto">
                <button
                  onClick={() => navigate(`/blog/${blog._id}/edit`)}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className={`px-4 py-2 text-white rounded-md text-sm transition ${deletingId === blog._id
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                    }`}
                >
                  {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AutherBlogs
