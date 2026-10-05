const mongoose = require('mongoose');

// We define exactly how an Opportunity should look in the database
const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'], // Validation: Title is mandatory
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Hackathon', 'Internship', 'Scholarship', 'Workshop',
      'Training', 'Coding Contest', 'Competition', 'Seminar',
      'Conference', 'Research Opportunity', 'Placement Drive', 'Job', 'Other'
    ] // enum ensures the category must be one of these exact strings
  },
  organizerName: {
    type: String,
    default: 'Unknown Organizer'
  },
  skills: {
    type: [String], // Array of strings (e.g. ["React", "Node.js"])
    default: []
  },
  location: {
    city: String,
    state: String
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    default: 'Offline'
  },
  deadline: {
    type: Date
  },
  eventDate: {
    type: Date
  },
  applicationDeadline: {
    type: Date
  },
  trainingDuration: {
    type: String
  },
  prize: {
    type: String
  },
  url: {
    type: String // We need this to store real application links!
  },
  teamSize: {
    type: Number,
    default: 1

  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date when created
  }
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Opportunity', opportunitySchema);
