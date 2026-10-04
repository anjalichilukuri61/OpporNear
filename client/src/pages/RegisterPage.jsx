import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // Default to student
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle typing in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle clicking the submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    setIsLoading(true);
    setError('');

    try {
      // Send the data to the API we just built!
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Save the user data and token globally
      login(response.data.user, response.data.token);
      
      // Redirect them based on their role!
      if (response.data.user.role === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/opportunities');
      }
    } catch (err) {
      // If the API throws an error (like "User already exists"), show it
      setError(err.response?.data?.message || 'Something went wrong during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-500 mt-2">Join OpporNear to discover amazing opportunities.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="john@university.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-blue-100 peer-checked:text-primary hover:border-blue-400 hover:bg-blue-50 transition-all text-center shadow-sm">
                  <span className="block text-3xl mb-2">🎓</span>
                  <span className="font-bold">Student</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="organizer"
                  checked={formData.role === 'organizer'}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-blue-100 peer-checked:text-primary hover:border-blue-400 hover:bg-blue-50 transition-all text-center shadow-sm">
                  <span className="block text-3xl mb-2">🏢</span>
                  <span className="font-bold">Organizer</span>
                </div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-blue-600 text-gray font-medium py-3 rounded-xl transition-colors mt-4 flex justify-center items-center border border-gray-300"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
