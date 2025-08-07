import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:8050/api/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter email first");

    setLoadingOtp(true);
    try {
      await axios.post(`${API}/send-otp`, { email });
      alert("OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !otp) {
      alert("All fields are required.");
      return;
    }

    setLoadingSignup(true);
    try {
      await axios.post(`${API}/verify-otp`, {
        username,
        email,
        password,
        otp,
      });
      alert("Signup successful!");
      navigate('/login');
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>

      <form onSubmit={handleSignup} className="space-y-4">

        {/* Username */}
        <div>
          <label>Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email + Send OTP */}
        <div>
          <label>Email</label>
          <div className="flex">
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-l"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loadingOtp || !email}
              className="px-4 text-white bg-blue-600 rounded-r hover:bg-blue-700"
            >
              {loadingOtp ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* OTP (Shown only after sending) */}
        {otpSent && (
          <>
            <div>
              <label>OTP</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loadingSignup}
          className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          {loadingSignup ? 'Creating account...' : 'Verify & Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <p className="text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-700 hover:underline hover:text-blue-900">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;