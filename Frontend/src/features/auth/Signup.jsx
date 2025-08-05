import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './authService';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      alert('Signup failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <div className="mt-4 text-sm text-center">
          <p className="text-gray-700">
            Already have an account?
            <Link to="/login" className="font-semibold text-blue-700 transition hover:underline hover:text-blue-900">Sign in here</Link>
            {/* <a
              href="/login"
              className="font-semibold text-blue-700 transition hover:underline hover:text-blue-900"
            >
              Sign in here
            </a> */}
          </p>
        </div>

      </form>
    </div>
  );
};

export default Signup;
