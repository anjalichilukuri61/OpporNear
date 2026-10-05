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
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(opportunity.category)}`}>
            {opportunity.category}
          </span>
          {opportunity.matchScore > 0 && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center border border-green-200 shadow-sm">
               ⭐ {opportunity.matchScore}% Match
            </span>
          )}
        </div>
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
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
        {opportunity.description}
      </p>

      {/* Recommendation Engine Box */}
      {opportunity.matchReasons && opportunity.matchReasons.length > 0 && (
        <div className="bg-green-50/70 rounded-lg p-3 mb-4 border border-green-100">
          <p className="text-xs text-green-800 font-bold mb-1">✨ Why we recommend this:</p>
          <ul className="list-disc pl-4 text-xs text-green-700 space-y-0.5">
            {opportunity.matchReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta details (Date, Location, Prize) */}
      <div className="space-y-2 mb-6">
        {(opportunity.mode === 'Offline' || opportunity.mode === 'Hybrid') && opportunity.location?.city && (
          <div className="flex items-center text-sm text-gray-700 font-medium">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {opportunity.location.city}{opportunity.location.state ? `, ${opportunity.location.state}` : ''}
          </div>
        )}
        {opportunity.category === 'Hackathon' && opportunity.eventDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Hackathon Date: {new Date(opportunity.eventDate).toLocaleDateString()}
          </div>
        )}
        {opportunity.category === 'Workshop' && opportunity.eventDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Workshop Date: {new Date(opportunity.eventDate).toLocaleDateString()}
          </div>
        )}
        {opportunity.category === 'Scholarship' && opportunity.applicationDeadline && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Last Date to Apply: {new Date(opportunity.applicationDeadline).toLocaleDateString()}
          </div>
        )}
        {opportunity.category === 'Training' && opportunity.trainingDuration && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Duration: {opportunity.trainingDuration}
          </div>
        )}
        {/* Fallback for categories without specific fields or older data */}
        {!['Hackathon', 'Workshop', 'Scholarship', 'Training'].includes(opportunity.category) && opportunity.deadline && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Deadline: {opportunity.deadline}
          </div>
        )}
        {/* Fallback for seeded data that has deadline but not eventDate */}
        {['Hackathon', 'Workshop'].includes(opportunity.category) && !opportunity.eventDate && opportunity.deadline && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Date: {opportunity.deadline}
          </div>
        )}
        {opportunity.category === 'Scholarship' && !opportunity.applicationDeadline && opportunity.deadline && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Last Date to Apply: {opportunity.deadline}
          </div>
        )}

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
      {opportunity.url ? (
        <a
          href={opportunity.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2.5 bg-blue-50 text-blue-700 hover:bg-primary hover:text-white font-medium rounded-xl transition-colors mt-auto border border-blue-200"
        >
          Apply Now (External)
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      ) : (
        <Link
          to={`/opportunities/${opportunity._id || opportunity.id}`}
          className="w-full flex items-center justify-center py-2.5 bg-gray-50 hover:bg-primary hover:text-white text-gray-700 font-medium rounded-xl transition-colors mt-auto border border-gray-200 hover:border-primary"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export default OpportunityCard;
