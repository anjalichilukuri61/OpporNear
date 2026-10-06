import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, Target } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary font-medium text-sm mb-8">
          <Zap className="h-4 w-4" />
          <span>Student-focused Opportunity Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-dark tracking-tight mb-6">
          Discover opportunities. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Don't miss opportunities what's near you.
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-600 max-w-2xl mb-10">
          Hackathons, internships, scholarships, and workshops scattered across the web, brought into one place and personalized for your skills and location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/opportunities" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl text-gray bg-primary hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30">
            Start Discovering
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
            Learn How It Works
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Location-Aware</h3>
              <p className="text-gray-600">Find events and internships within your preferred radius. We prioritize what's actually accessible to you.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-secondary rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Eligibility Matching</h3>
              <p className="text-gray-600">No more reading long documents. We compare your profile with the opportunity's requirements automatically.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Deadline Intelligence</h3>
              <p className="text-gray-600">Get alerts for closing opportunities. Categorized clearly so you never miss an important date.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
