import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = (
    <>
      <Link to="/" className="transition hover:text-blue-600">Home</Link>

      {isAuthenticated && (
        <>
          <Link to="/create-blog" className="transition hover:text-blue-600">Create Blog</Link>
          <Link to="/my-blogs" className="transition hover:text-blue-600">My Blogs</Link>
        </>
      )}
      <Link to="/contact" className="transition hover:text-blue-600">Contact</Link>

      {isAuthenticated ? (
        <button onClick={handleLogout} className="transition hover:text-red-600">Logout</button>
      ) : (
        <>
          <Link to="/login" className="transition hover:text-blue-600">Login</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition">Sign Up</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link to="/" className="text-4xl font-bold text-blue-700">Blog<span className='text-blue-900'>Code</span></Link>
        
        <div className="items-center hidden space-x-8 text-lg font-bold text-gray-900 md:flex">
          {navLinks}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="px-4 pb-4 space-y-2 font-medium text-gray-700 md:hidden">
          {navLinks}
        </div>
      )}
    </nav>
  );
}