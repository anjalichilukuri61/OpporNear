import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import OpportunityCard from '../components/OpportunityCard';

import { Search, Filter, Map } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { cityCoordinates, getDistance } from '../utils/distanceCalc';

function OpportunitiesPage() {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  const [locationSearch, setLocationSearch] = useState('');
  const [maxDistance, setMaxDistance] = useState(2000); // Default to a large radius
  const [sortBy, setSortBy] = useState('Recommended');
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch data from BOTH MongoDB and Remotive API!
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // A. Fetch Local MongoDB Data
        const dbRes = await axios.get('http://localhost:5000/api/opportunities');
        const dbData = dbRes.data.data.map(opp => ({
          ...opp,
          deadline: opp.deadline ? new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Rolling'
        }));

        // B. Fetch Live Remotive Data
        let liveData = [];
        try {
          const apiRes = await axios.get('https://remotive.com/api/remote-jobs?limit=10');
          liveData = apiRes.data.jobs.map(job => ({
            _id: job.id.toString(), // Convert ID to string
            title: job.title,
            category: 'Internship',
            mode: 'Online',
            organizerName: job.company_name,
            description: job.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...',
            deadline: 'Apply ASAP',
            prize: job.salary ? job.salary : 'Salary Undisclosed',
            skills: job.tags && job.tags.length > 0 ? job.tags.slice(0, 3) : ['Tech', 'Remote'],
            url: job.url // The real application link!
          }));
        } catch (apiErr) {
          console.error("Remotive API failed, skipping live data", apiErr);
        }

        // C. Combine them together! MongoDB first, then Live Jobs!
        setOpportunities([...dbData, ...liveData]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []); // Run once on load

  // 3. Apply all filters to the opportunities array
  const filteredOpportunities = opportunities.filter((opp) => {
    // Search Term Filter (Title or Skills)
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category Filter
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;

    // Mode Filter
    const matchesMode = selectedMode === 'All' || opp.mode === selectedMode;

    // Location Filter
    const locationString = opp.location ? `${opp.location.city} ${opp.location.state}`.toLowerCase() : '';
    const matchesLocation = !locationSearch || locationString.includes(locationSearch.toLowerCase());

    return matchesSearch && matchesCategory && matchesMode && matchesLocation;
  });

  // 4. Recommendation & Distance Engine
  const opportunitiesProcessed = filteredOpportunities.map(opp => {
    let score = 0;
    let matchReasons = [];
    let computedDistance = null;

    // Calculate Haversine Distance if cities are mapped and mode is not fully remote
    if (user?.currentLocation && opp.location?.city && opp.mode !== 'Online') {
      const userCityMatch = Object.keys(cityCoordinates).find(city => user.currentLocation.toLowerCase().includes(city.toLowerCase()));
      const oppCityMatch = Object.keys(cityCoordinates).find(city => opp.location.city.toLowerCase().includes(city.toLowerCase()));

      if (userCityMatch && oppCityMatch) {
        if (userCityMatch === oppCityMatch) {
          computedDistance = 0;
          score += 15; // Small bonus for being in the exact same city
          matchReasons.push(`In your exact city!`);
        } else {
          const userCoords = cityCoordinates[userCityMatch];
          const oppCoords = cityCoordinates[oppCityMatch];
          computedDistance = getDistance(userCoords.lat, userCoords.lon, oppCoords.lat, oppCoords.lon);
          if (computedDistance < 50) {
            score += 10;
            matchReasons.push(`Very close to you (${computedDistance}km away)`);
          }
        }
      }
    }

    // Match based on Skills
    if (user?.skills && user.skills.length > 0 && opp.skills) {
      const userSkillsLower = user.skills.map(s => s.toLowerCase());
      const matchedSkills = opp.skills.filter(s => userSkillsLower.includes(s.toLowerCase()));

      if (matchedSkills.length > 0) {
        score += matchedSkills.length * 25; // 25% per matching skill
        matchReasons.push(`Matches your skills: ${matchedSkills.join(', ')}`);
      }
    }

    // Match based on Category / Interests
    if (user?.interestes && user.interestes.length > 0 && opp.category) {
      const userInterestsLower = user.interestes.map(i => i.toLowerCase());
      if (userInterestsLower.includes(opp.category.toLowerCase())) {
        score += 35; // 35% for matching category interest
        matchReasons.push(`Matches your interest in ${opp.category}`);
      }
    }

    // Cap score at 98 for realism
    if (score > 98) score = 98;

    return { ...opp, matchScore: score, matchReasons, computedDistance };
  });

  // Filter out opportunities that are beyond the max distance (only if they have a computed distance)
  const distanceFilteredOpportunities = opportunitiesProcessed.filter(opp => {
    if (opp.computedDistance !== null && opp.computedDistance > maxDistance) {
      return false; // Too far away!
    }
    return true; // Within distance or Remote/Unknown
  });

  // 5. Sort the results
  const sortedOpportunities = [...distanceFilteredOpportunities].sort((a, b) => {
    if (sortBy === 'Recommended') {
      return b.matchScore - a.matchScore; // Highest score first
    } else if (sortBy === 'Newest') {
      const dateA = new Date(a.createdAt || Date.now());
      const dateB = new Date(b.createdAt || Date.now());
      return dateB - dateA; // Newest first
    }
    return 0; // Default
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 shadow-sm">
            <span className="text-sm text-gray-500 pl-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-medium text-dark focus:outline-none py-1 pr-2 cursor-pointer"
            >
              <option value="Recommended">Recommended For You</option>
              <option value="Newest">Newest</option>
            </select>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 border rounded-xl shadow-sm transition-colors ${showFilters ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Filter Panel (Toggled) */}
      {showFilters && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-down">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
            >
              <option value="All">All Categories</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Internship">Internship</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Workshop">Workshop</option>
              <option value="Training">Training</option>
              <option value="Coding Contest">Coding Contest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
            >
              <option value="All">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g. Hyderabad or Delhi"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
            />
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Map className="h-4 w-4 mr-2 text-primary" />
                Max Distance (Radius from your profile city)
              </label>
              <span className="text-sm font-bold text-primary">{maxDistance === 2000 ? 'Anywhere' : `${maxDistance} km`}</span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10km (Local)</span>
              <span>500km (Regional)</span>
              <span>2000km (National)</span>
            </div>
          </div>

          {/* Active Filter Count */}
          <div className="md:col-span-3 flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Found <strong>{filteredOpportunities.length}</strong> opportunities
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedMode('All');
                setLocationSearch('');
                setSearchTerm('');
                setMaxDistance(2000);
              }}
              className="text-sm text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Grid of Opportunities or Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500 font-medium">Fetching opportunities near you...</p>
        </div>
      ) : sortedOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOpportunities.map((opportunity) => (
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
