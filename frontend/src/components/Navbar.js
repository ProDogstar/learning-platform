import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            🎓 EduPlatform
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/courses" className="hover:text-blue-200 transition">Courses</Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'admin' && (
                  <Link to="/admin" className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition font-semibold">
                    👨‍💼 Admin
                  </Link>
                )}
                {user?.role === 'student' && (
                  <Link to="/dashboard" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition font-semibold">
                    📊 Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <img 
                    src={user?.profileImage || 'https://via.placeholder.com/40'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">{user?.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="border border-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-400 space-y-2">
            <Link to="/" className="block py-2 hover:text-blue-200">Home</Link>
            <Link to="/courses" className="block py-2 hover:text-blue-200">Courses</Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block py-2 hover:text-blue-200">Admin Dashboard</Link>
                )}
                {user?.role === 'student' && (
                  <Link to="/dashboard" className="block py-2 hover:text-blue-200">My Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-blue-200">Login</Link>
                <Link to="/register" className="block py-2 hover:text-blue-200">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}