import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from './blogService';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (image) data.append('image', image);

      await createBlog(data);
      navigate('/blog');
    } catch (err) {
      alert('Failed to create blog: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl px-6 py-16 mx-auto">
      <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
        ✍️ Create a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter your blog title..."
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Image URL (Optional)
          </label>
          <input
            type="file"
            name="image/*"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.image}
            onChange={handleImageChange}
            placeholder="Paste image URL (e.g., https://...)"
          />
          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Preview"
                className="object-cover w-full rounded-lg shadow max-h-60"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Content</label>
          <textarea
            name="description"
            rows="8"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Submitting...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
