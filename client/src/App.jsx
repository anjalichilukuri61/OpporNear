import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailsPage from './pages/OpportunityDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import PostOpportunityPage from './pages/PostOpportunityPage';
import SavedOpportunitiesPage from './pages/SavedOpportunitiesPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans">
          <Navbar />
        
        {/* Router determines which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved" element={<SavedOpportunitiesPage />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/create" element={<PostOpportunityPage />} />
        </Routes>
      </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
