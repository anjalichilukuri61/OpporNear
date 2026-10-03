import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpportunityCard from '../components/OpportunityCard';
import { Search, Filter } from 'lucide-react';

function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch real data from our Node.js Backend!
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // We use axios to make an HTTP GET request to our API
        const response = await axios.get('http://localhost:5000/api/opportunities');

        // Our API returns an object like { success: true, data: [...] }
        // So we grab the .data array and save it to our state!
        setOpportunities(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []); // Run once on load

  // 3. Filter our state variable 'opportunities', NOT the mock data directly
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesTitle = opp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = opp.skills.some(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesTitle || matchesSkills;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Discover Opportunities</h1>
          <p className="text-gray-600 mt-1">Find the best hackathons, internships, and workshops.</p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow md:flex-grow-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search skills, titles..."
              value={searchTerm} // 3. Bind the input value to our state
              onChange={(e) => setSearchTerm(e.target.value)} // 4. Update state when user types
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid of Opportunities or Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500 font-medium">Fetching opportunities near you...</p>
        </div>
      ) : filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            // MongoDB uses '_id' instead of 'id'
            <OpportunityCard key={opportunity._id || opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No opportunities found matching "<span className="font-semibold">{searchTerm}</span>"</p>
        </div>
      )}

    </div>
  );
}

export default OpportunitiesPage;
