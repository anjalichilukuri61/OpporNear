import React from 'react';
import OpportunityCard from '../components/OpportunityCard';
import { mockOpportunities } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

function OpportunitiesPage() {
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

    </div>
  );
}

export default OpportunitiesPage;
