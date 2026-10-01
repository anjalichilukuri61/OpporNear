import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Trophy, ArrowRight } from 'lucide-react';

function OpportunityCard({ opportunity }) {
  // Determine badge colors based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Hackathon': return 'bg-purple-100 text-purple-700';
      case 'Internship': return 'bg-blue-100 text-blue-700';
      case 'Workshop': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">

      {/* Header (Category & Mode) */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(opportunity.category)}`}>
          {opportunity.category}
        </span>
        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
          {opportunity.mode}
        </span>
      </div>

      {/* Main Info */}
      <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-primary transition-colors line-clamp-1">
        {opportunity.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">{opportunity.organizerName}</p>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
        {opportunity.description}
      </p>

      {/* Meta details (Location, Date, Prize) */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          {opportunity.location.city}, {opportunity.location.state}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          Apply by {opportunity.deadline}
        </div>
        <div className="flex items-center text-sm font-medium text-green-600">
          <Trophy className="h-4 w-4 mr-2 text-green-500" />
          {opportunity.prize}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {opportunity.skills.map((skill, index) => (
          <span key={index} className="text-xs text-gray-600 bg-slate-100 px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <Link
        to={`/opportunities/${opportunity.id}`}
        className="w-full flex items-center justify-center py-2.5 bg-gray-50 hover:bg-primary hover:text-white text-gray-700 font-medium rounded-xl transition-colors mt-auto border border-gray-200 hover:border-primary"
      >
        View Details
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

export default OpportunityCard;
