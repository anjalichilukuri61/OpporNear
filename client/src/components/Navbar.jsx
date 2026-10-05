import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, LogOut, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-dark">OpporNear</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {user && (
              <>
                <Link to="/opportunities" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors">
                  Discover
                </Link>
                <Link to="/saved" className="flex items-center text-gray-600 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors">
                  <Heart className="h-4 w-4 mr-1.5" />
                  Saved
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          {user ? (
            <div className="flex items-center space-x-6">
              {user.role === 'organizer' ? (
                <Link to="/organizer/dashboard" className="flex items-center text-gray-700 hover:text-primary transition-colors cursor-pointer">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Organizer Dashboard</span>
                </Link>
              ) : (
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-primary transition-colors cursor-pointer">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Welcome, {user.name}</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-primary font-medium">
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-xl text-gray bg-primary hover:bg-blue-600 transition-all shadow-md hover:shadow-blue-500/30"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
