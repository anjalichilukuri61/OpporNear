# OpporNear - Development Roadmap

This document outlines the step-by-step development phases for the Local Opportunity Intelligence System (OpporNear). We are building this incrementally as a learning project.

## Phase 1: Project Setup (✅ Completed)
- Set up Node.js, npm, and Git.
- Created the Express backend (`server/`) and connected it to MongoDB.
- Created the Vite + React frontend (`client/`).
- Configured environment variables (`.env`).
- Pushed the initial code to GitHub.

## Phase 2: Frontend Fundamentals (✅ Completed)
- Configured Tailwind CSS for styling.
- Set up React Router for page navigation (Single Page Application).
- Built the `Navbar` and `LandingPage` components.
- Created mock data (`mockData.js`) to test the UI without a database.
- Built the `OpportunitiesPage` to display a grid of `OpportunityCard` components.
- Built the `OpportunityDetailsPage` using dynamic routing (`/opportunities/:id`).

## Phase 3: React Deep Dive (✅ Completed)
- ✅ Managing State (`useState`) and Props (Completed search filtering).
- ✅ Using `useEffect` to manage component lifecycles (Simulated API calls).
- ✅ *Note: React Context will be introduced later during Authentication.*

## Phase 4: Backend REST APIs (✅ Completed)
- ✅ Build CRUD (Create, Read, Update, Delete) operations for Opportunities.
- ✅ *Note: We will build APIs for Categories and Users naturally as we create their schemas in Phase 5.*

## Phase 5: MongoDB Schemas (✅ Completed)
- ✅ Create robust Mongoose database models for: Opportunity, User, Organization, etc.

## Phase 6: Authentication & Security (✅ Completed)
- ✅ Implement User Registration and Login.
- ✅ Add JWT (JSON Web Tokens) and password hashing (bcrypt).
- ✅ Set up protected routes and role-based access.

## Phase 7: Student Profile (✅ In Progress)
- ⏳ Build the profile completion flow (Skills, Interests, Education, Location, and Preferences).

## Phase 8: Search & Filter System
- Implement deep filtering (Search, Category, Location, Mode, Date, Deadline, Skills).
- Implement Pagination for large datasets.

## Phase 9: Recommendation Engine (Core Feature)
- Build the intelligence layer to match students with opportunities based on Skills, Interests, Eligibility, and Location.
- Provide clear explanations: "Why this was recommended for you".

## Phase 10: Nearby Opportunity Radar
- Store coordinates (latitude/longitude) in the database.
- Calculate distances using the Haversine formula.
- Implement radius filtering (e.g., "Show me hackathons within 25 km").

## Phase 11: Deadline Intelligence
- Automatically categorize events as: Upcoming, Closing Soon, or Expired.
- Build the "Don't Miss This" urgency feature.

## Phase 12: Notifications
- In-app alerts for approaching deadlines and new personalized recommendations.

## Phase 13: Duplicate Detection
- Prevent the exact same event from being added multiple times (matching by title, organizer, date, and location).

## Phase 14: Testing
- Test Authentication, APIs, Forms, and the custom Recommendation logic.

## Phase 15: Deployment
- Deploy the frontend, backend, and database securely using free-tier services.
