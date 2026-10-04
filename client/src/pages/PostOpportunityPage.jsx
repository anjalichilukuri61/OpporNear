import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

function PostOpportunityPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Hackathon',
    mode: 'Offline',
    description: '',
    city: '',
    state: '',
    url: '',
    prize: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        organizerName: user.name, // Use the logged in organizer's name!
        location: { city: formData.city, state: formData.state }
      };

      await axios.post('http://localhost:5000/api/opportunities', dataToSubmit);
      setMessage('Success! Opportunity Posted to the Discover page!');
      setTimeout(() => navigate('/organizer/dashboard'), 2000);
    } catch (err) {
      setMessage('Error posting opportunity.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/organizer/dashboard" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-dark mb-2">Post New Opportunity</h1>
      <p className="text-gray-600 mb-8">Fill out the details below to publish your event to students.</p>

      {message && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl font-medium">{message}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="e.g. Winter Codefest 2026" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white">
              <option>Hackathon</option><option>Internship</option><option>Scholarship</option><option>Workshop</option><option>Training</option><option>Seminar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select name="mode" value={formData.mode} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white">
              <option>Offline</option><option>Online</option><option>Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="Vijayawada" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="Andhra Pradesh" />
          </div>
        </div>

        {/* DYNAMIC FIELDS BASED ON CATEGORY */}
        {formData.category === 'Hackathon' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hackathon Date</label>
            <input type="date" name="eventDate" value={formData.eventDate || ''} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
          </div>
        )}

        {formData.category === 'Workshop' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workshop Date</label>
            <input type="date" name="eventDate" value={formData.eventDate || ''} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
          </div>
        )}

        {formData.category === 'Scholarship' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Date to Apply</label>
            <input type="date" name="applicationDeadline" value={formData.applicationDeadline || ''} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
          </div>
        )}

        {formData.category === 'Training' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Training Duration (e.g., 15 days)</label>
            <input type="text" name="trainingDuration" value={formData.trainingDuration || ''} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="15 days" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
          <input type="url" name="url" value={formData.url} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prize / Salary</label>
          <input type="text" name="prize" value={formData.prize} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="₹50,000" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-xl" placeholder="Describe the event..."></textarea>
        </div>

        <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary text-gray font-bold rounded-xl hover:bg-blue-600 transition-colors border border-gray-400">
          {isLoading ? 'Posting...' : 'Post Opportunity'}
        </button>
      </form>
    </div>
  );
}

export default PostOpportunityPage;
