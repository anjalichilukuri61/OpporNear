const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Opportunity = require('./models/Opportunity');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const sampleData = [
  {
    title: 'Smart India Hackathon 2026',
    description: 'A nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving.',
    category: 'Hackathon',
    organizerName: 'Ministry of Education',
    mode: 'Offline',
    teamSize: 6,
    eventDate: new Date('2026-10-15'),
    prize: '₹1,00,000',
    skills: ['React', 'Node.js', 'AI/ML'],
    location: { city: 'New Delhi', state: 'Delhi' },
    url: 'https://www.sih.gov.in/'
  },
  {
    title: 'Google Venkat Scholarship',
    description: 'A scholarship program by Google for university students studying computer science. Recipients receive financial support and a chance to visit a Google office.',
    category: 'Scholarship',
    organizerName: 'Google India',
    mode: 'Online',
    teamSize: 1,
    applicationDeadline: new Date('2026-11-20'),
    prize: '$2500 Grant',
    skills: ['Computer Science', 'Leadership'],
    location: { city: 'Bangalore', state: 'Karnataka' },
    url: 'https://buildyourfuture.withgoogle.com/scholarships/venkat-panchapakesan-scholarships'
  },
  {
    title: 'AWS Cloud Summit & Workshop',
    description: 'Join thousands of cloud enthusiasts to learn about the latest AWS innovations. Features hands-on workshops with AWS architects.',
    category: 'Workshop',
    organizerName: 'Amazon Web Services',
    mode: 'Offline',
    teamSize: 1,
    eventDate: new Date('2026-10-10'),
    prize: 'AWS Credits + Swag',
    skills: ['Cloud Computing', 'AWS', 'DevOps'],
    location: { city: 'Hyderabad', state: 'Telangana' },
    url: 'https://aws.amazon.com/events/summits/'
  },
  {
    title: 'Web3 & Blockchain Internship',
    description: 'A highly selective 6-month internship program for students interested in building decentralized applications using Ethereum and Solidity.',
    category: 'Internship',
    organizerName: 'Polygon Labs',
    mode: 'Online',
    teamSize: 1,
    applicationDeadline: new Date('2026-10-25'),
    prize: '₹30,000 / month',
    skills: ['Solidity', 'Web3.js', 'React'],
    location: { city: 'Remote', state: 'Remote' },
    url: 'https://polygon.technology/careers'
  },
  {
    title: 'Global Tech Seminar on GenAI',
    description: 'An exclusive seminar featuring top AI researchers discussing the future of Generative AI, Prompt Engineering, and AI Ethics.',
    category: 'Seminar',
    organizerName: 'OpenAI Campus Outreach',
    mode: 'Hybrid',
    teamSize: 1,
    eventDate: new Date('2026-11-05'),
    prize: 'Certificate of Participation',
    skills: ['AI/ML', 'Generative AI', 'Python'],
    location: { city: 'Mumbai', state: 'Maharashtra' },
    url: 'https://openai.com/'
  },
  {
    title: 'TCS CodeVita Season 13',
    description: 'The worlds largest computer programming competition. Solve challenging algorithmic puzzles to win cash prizes and direct interview opportunities.',
    category: 'Coding Contest',
    organizerName: 'Tata Consultancy Services',
    mode: 'Online',
    teamSize: 1,
    deadline: new Date('2026-12-01'),
    prize: '$10,000 + Job Offer',
    skills: ['Data Structures', 'Algorithms', 'C++'],
    location: { city: 'Remote', state: 'Remote' },
    url: 'https://www.tcscodevita.com/'
  },
  {
    title: 'Women Techmakers Engineering Scholarship',
    description: 'Provides visibility, community, and resources for women in technology. Awardees receive a financial grant for the academic year.',
    category: 'Scholarship',
    organizerName: 'Google',
    mode: 'Online',
    teamSize: 1,
    applicationDeadline: new Date('2026-12-15'),
    prize: '₹1,50,000',
    skills: ['Any Tech Skill'],
    location: { city: 'Remote', state: 'Remote' },
    url: 'https://www.womentechmakers.com/scholars'
  },
  {
    title: 'FinTech Innovation Hackathon',
    description: 'Build the next generation of financial tools. Create solutions for secure payments, financial literacy, or micro-investing.',
    category: 'Hackathon',
    organizerName: 'PayTM',
    mode: 'Offline',
    teamSize: 4,
    eventDate: new Date('2026-10-28'),
    prize: '₹50,000 + Internship',
    skills: ['FinTech', 'Node.js', 'MongoDB'],
    location: { city: 'Vijayawada', state: 'Andhra Pradesh' },
    url: 'https://paytm.com/careers'
  }
];

const importData = async () => {
  try {
    // 1. Delete all existing opportunities to start fresh
    await Opportunity.deleteMany();
    console.log('Old Data Destroyed...');

    // 2. Insert our beautiful sample data
    await Opportunity.insertMany(sampleData);
    console.log('Data Imported Successfully!');
    
    // 3. Exit the script
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the function
importData();
