import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailsPage from './pages/OpportunityDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        
        {/* Router determines which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/radar" element={<div className="p-10 text-center text-xl">Nearby Radar (Coming Soon!)</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
