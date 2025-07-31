import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlogById } from './blogService';
import { getCurrentUser } from '../auth/authService';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog);
        setFormData({ title: data.blog.title, description: data.blog.description });
      } catch {
        setError('Unable to load blog.');
      }
    };
    fetchBlog();
  }, [id]);

  const currentUser = getCurrentUser();

  if (blog && currentUser?._id !== blog.author?._id) {

    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">
        You do not have permission to edit this blog.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBlogById(id, formData);
      navigate(`/blog/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">{error}</div>
    );

  if (!blog)
    return (
      <div className="mt-32 text-lg italic text-center text-gray-500">Loading blog...</div>
    );

  return (
    <div className="max-w-3xl px-6 py-16 mx-auto">
      <h2 className="mb-6 text-3xl font-bold">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            rows="10"
            className="w-full px-4 py-2 border rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
