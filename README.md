# Local Opportunity Intelligence System (OpporNear)

**"Discover opportunities. Don't miss what's near you."**

## 1. Project Overview
OpporNear is a full-stack student-focused web application. It solves the problem of scattered student opportunities by bringing hackathons, internships, scholarships, and workshops into one centralized platform.

## 2. Problem Statement
Students frequently miss valuable opportunities because information is scattered across college websites, organization pages, WhatsApp groups, and social media. By the time they find an opportunity, the deadline has often passed.

## 3. Proposed Solution
> **Collect → Clean → Verify → Understand → Recommend**

OpporNear prioritizes personalized recommendations based on the student's:
- Location (Nearby opportunities)
- Skills & Interests
- Education, Branch, & Academic Year
- Preferred categories & deadlines

## 4. Features
- **Location-Aware Discovery**: Finds opportunities within a specific radius using the Haversine formula.
- **Explainable Recommendations**: Tells the user exactly *why* an opportunity matches their profile.
- **Eligibility Checking**: Cross-references student profiles with opportunity requirements.
- **Deadline Intelligence**: Highlights upcoming, closing soon, and urgent deadlines.
- **Opportunity Radar**: A dedicated interface to see what is happening nearby.

## 5. Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Lucide React
- **Backend**: Node.js, Express.js, REST APIs, JWT Authentication
- **Database**: MongoDB Atlas (Mongoose)

## 6. Architecture (MERN Stack)
- `client/`: The React frontend application.
- `server/`: The Node.js/Express backend API.
- Secure communication via REST APIs with JWT for authorization.

## 7. Current Development Status
Currently completing **Phase 2: Frontend Fundamentals**.
*(See the `PHASES.md` file for the complete development roadmap).*

## 8. Setup Instructions (Local Development)

### Backend
1. `cd server`
2. `npm install`
3. Create a `.env` file based on `.env.example`
4. `npm run dev` (Runs on port 5000)

### Frontend
1. `cd client`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

---
*Note: This project is being built incrementally as a learning experience.*
