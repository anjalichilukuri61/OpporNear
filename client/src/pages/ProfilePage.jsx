import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ProfilePage() {
  const { user, login } = useContext(AuthContext); // We use login to update the global user state

  const [formData, setFormData] = useState({
    college: user?.college || '',
    branch: user?.branch || '',
    graduationYear: user?.graduationYear || '',
    skills: user?.skills?.join(', ') || '',
    interestes: user?.interestes?.join(', ') || '',
    currentLocation: user?.currentLocation || '',
    preferredMode: user?.preferredMode || 'Any',
    preferredCategories: user?.preferredCategories?.join(', ') || ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🚀 GPS Auto-Detect Function!
  const detectLocation = () => {
    if ("geolocation" in navigator) {
      setMessage('Detecting location...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Convert Latitude/Longitude into a City Name using a free reverse geocoding API
            const { latitude, longitude } = position.coords;
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            
            // Extract city (could be classified as town, village, or county depending on the area)
            const cityOrTown = res.data.address.city || res.data.address.town || res.data.address.village || res.data.address.county || '';
            const state = res.data.address.state || '';
            
            // Combine them neatly! (e.g. "Vijayawada, Andhra Pradesh")
            const formattedLocation = [cityOrTown, state].filter(Boolean).join(', ');
            
            setFormData({ ...formData, currentLocation: formattedLocation });
            setMessage('Location detected successfully!');
          } catch (err) {
            setMessage('Could not convert GPS to city name.');
          }
        },
        (error) => {
          setMessage('GPS permission denied or unavailable.');
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 1. Convert comma-separated strings back into Arrays for MongoDB
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        interestes: formData.interestes.split(',').map(s => s.trim()).filter(s => s),
        preferredCategories: formData.preferredCategories.split(',').map(s => s.trim()).filter(s => s)
      };

      // 2. Get the token from local storage
      const token = localStorage.getItem('token');

      // 3. Send the PUT request with the token in the Headers
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 4. Update the global React state so the Navbar stays correct
      login(response.data.data, token);

      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
      <p className="text-gray-600 mb-8">Tell us about yourself so we can recommend the best opportunities near you!</p>

      {message && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g. Stanford University"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch/Major</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g. Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="2027"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="React, Python, Machine Learning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests (comma separated)</label>
          <input
            type="text"
            name="interestes"
            value={formData.interestes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Hackathons, Web3, UI/UX"
          />
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendation Preferences</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Location (City)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g. Hyderabad"
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
                >
                  📍 Auto Detect
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Mode</label>
                <select
                  name="preferredMode"
                  value={formData.preferredMode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                >
                  <option value="Any">Any Mode</option>
                  <option value="Online">Online Only</option>
                  <option value="Offline">Offline / In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Categories (comma separated)</label>
                <input
                  type="text"
                  name="preferredCategories"
                  value={formData.preferredCategories}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Hackathon, Workshop, Internship"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-blue-600 text-gray font-medium py-3 rounded-xl transition-colors flex justify-center items-center"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
