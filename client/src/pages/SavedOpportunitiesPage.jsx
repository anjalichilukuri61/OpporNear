import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';
import { Heart } from 'lucide-react';

function SavedOpportunitiesPage() {
  const [savedOpps, setSavedOpps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedOpps = async () => {
      try {
        const savedList = JSON.parse(localStorage.getItem('savedOpportunities') || '[]');
        if (savedList.length === 0) {
          setIsLoading(false);
          return;
        }

        // Fetch all local opportunities and filter the ones we saved
        const res = await axios.get('http://localhost:5000/api/opportunities');
        const allOpps = res.data.data;
        
        const filtered = allOpps.filter(opp => savedList.includes(opp._id));
        setSavedOpps(filtered);
      } catch (err) {
        console.error("Error fetching saved opportunities:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedOpps();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <div className="flex items-center mb-8">
        <Heart className="h-8 w-8 text-red-500 mr-3 fill-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Saved Opportunities</h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500 font-medium">Loading saved opportunities...</p>
        </div>
      ) : savedOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedOpps.map(opp => (
            <OpportunityCard key={opp._id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-10">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No saved opportunities yet</h2>
          <p className="text-gray-500 mb-8">When you find an opportunity you like, click the "Save for later" button to bookmark it here!</p>
          <Link to="/opportunities" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-600 transition-colors">
            Discover Opportunities
          </Link>
        </div>
      )}
    </div>
  );
}

export default SavedOpportunitiesPage;
