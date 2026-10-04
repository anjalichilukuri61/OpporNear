import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, BarChart3, Users, Calendar } from 'lucide-react';

function OrganizerDashboard() {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/opportunities');
        // Filter out only the posts made by this specific organizer!
        const filtered = response.data.data.filter(opp => opp.organizerName === user.name);
        setMyPosts(filtered);
      } catch (err) {
        console.error("Error fetching my posts");
      }
    };
    if (user?.name) {
      fetchMyPosts();
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Organizer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}. Manage your opportunities here.</p>
        </div>
        <Link to="/organizer/create" className="flex items-center px-6 py-3 bg-white-100 text-gray-600 font-bold rounded-xl hover:bg-blue-200 transition-colors shadow-sm border border-gray-200">
          <PlusCircle className="h-5 w-5 mr-2 text-gray-500" />
          Post New Opportunity
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-4"><BarChart3 className="h-6 w-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Active Posts</p><p className="text-2xl font-bold text-dark">{myPosts.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-4 bg-green-50 text-green-600 rounded-xl mr-4"><Users className="h-6 w-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Views</p><p className="text-2xl font-bold text-dark">{myPosts.length * 42}</p></div>
        </div>
      </div>

      {myPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <h3 className="text-xl font-bold text-dark mb-2">No Opportunities Posted Yet</h3>
          <p className="text-gray-500 mb-6">Create your first hackathon, internship, or event to reach thousands of students locally.</p>
          <Link to="/organizer/create" className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors">
            <PlusCircle className="h-5 w-5 mr-2" /> Post Now
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-dark mb-6">Your Posted Opportunities</h2>
          <div className="space-y-4">
            {myPosts.map(post => (
              <div key={post._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-md">{post.category}</span>
                    <h3 className="font-bold text-lg text-dark">{post.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Link to={`/opportunities/${post._id}`} className="mt-4 sm:mt-0 text-sm font-medium text-primary hover:underline">
                  View Public Page
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerDashboard;
