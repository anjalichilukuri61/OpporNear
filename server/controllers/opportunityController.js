const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities
// @route   GET /api/opportunities
exports.getOpportunities = async (req, res) => {
  try {
    // Ask MongoDB to find ALL opportunities
    const opportunities = await Opportunity.find();
    
    res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get a single opportunity
// @route   GET /api/opportunities/:id
exports.getOpportunity = async (req, res) => {
  try {
    // Ask MongoDB to find one opportunity by its unique ID
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.status(200).json({ success: true, data: opportunity });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};

// @desc    Create a new opportunity
// @route   POST /api/opportunities
exports.createOpportunity = async (req, res) => {
  try {
    // This is where the magic happens!
    // Mongoose takes the data (req.body), checks it against your Schema rules, and saves it to MongoDB.
    const opportunity = await Opportunity.create(req.body);

    res.status(201).json({ 
      success: true, 
      data: opportunity 
    });
  } catch (error) {
    // If validation fails (e.g., they forgot a title), we catch the error and send it back
    res.status(400).json({ success: false, error: error.message });
  }
};
