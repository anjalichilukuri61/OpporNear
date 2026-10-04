import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Calendar, Users, Trophy } from 'lucide-react';

function OpportunityDetailsPage() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the real Opportunity from the MongoDB Database!
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/opportunities/${id}`);
        
        // Format the date just like we did on the Discover page
        const data = response.data.data;
        if (data.deadline) {
          data.deadline = new Date(data.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } else {
          data.deadline = 'Rolling';
        }

        setOpportunity(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching opportunity:", error);
        setIsLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Opportunity not found</h2>
        <Link to="/opportunities" className="text-primary hover:underline">Go back to listings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <Link to="/opportunities" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
            {opportunity.category}
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200">
            {opportunity.mode}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">{opportunity.title}</h1>
        <p className="text-xl text-gray-500 mb-8">Organized by {opportunity.organizerName}</p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <div className="text-sm text-gray-500 flex items-center mb-1"><MapPin className="h-4 w-4 mr-1" /> Location</div>
            <div className="font-semibold text-dark">{opportunity.location.city}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 flex items-center mb-1"><Calendar className="h-4 w-4 mr-1" /> Deadline</div>
            <div className="font-semibold text-dark">{opportunity.deadline}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 flex items-center mb-1"><Trophy className="h-4 w-4 mr-1" /> Reward</div>
            <div className="font-semibold text-dark">{opportunity.prize}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 flex items-center mb-1"><Users className="h-4 w-4 mr-1" /> Eligibility</div>
            <div className="font-semibold text-dark">Open to All</div>
          </div>
        </div>

        {/* Details */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-dark mb-4">About this Opportunity</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {opportunity.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-primary border border-blue-100 px-4 py-2 rounded-lg font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <button 
            onClick={() => window.open(opportunity.url || 'https://google.com', '_blank')}
            className="flex-1 bg-primary text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
          >
            {opportunity.url ? 'Apply Now (External)' : 'Apply Now'}
          </button>
          <button 
            onClick={() => alert('Opportunity saved to your profile! (Coming soon in Phase 11)')}
            className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Save for later
          </button>
        </div>

      </div>
    </div>
  );
}

export default OpportunityDetailsPage;
