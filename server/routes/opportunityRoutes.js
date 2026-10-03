const express = require('express');
const router = express.Router();

// Import the controller functions we just created
const {
  getOpportunities,
  getOpportunity,
  createOpportunity
} = require('../controllers/opportunityController');

// Map the routes to the controller functions
router.route('/')
  .get(getOpportunities)
  .post(createOpportunity);

router.route('/:id')
  .get(getOpportunity);

module.exports = router;
