import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, User } from 'lucide-react';

function Navbar() {
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
          <div className="hidden md:flex space-x-8">
            <Link to="/opportunities" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors">
              Discover
            </Link>
            <Link to="/radar" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors">
              Nearby Radar
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary p-2">
              <User className="h-5 w-5" />
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
