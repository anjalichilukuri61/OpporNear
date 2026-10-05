const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // 2. Hash the password
    // A 'salt' adds random data to the password before hashing so it's impossible to reverse engineer
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user in the database
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 4. Create a token so they are instantly logged in
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d' // Token expires in 30 days
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      token,
      user: userResponse
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email (we must explicitly ask for the password since we hid it in our Schema!)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 2. Compare the typed password with the encrypted password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Create a new token for the session
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      token,
      user: userResponse
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private (You must be logged in)
exports.updateProfile = async (req, res) => {
  try {
    // req.user is provided by our authMiddleware!
    const fieldsToUpdate = {
      college: req.body.college,
      branch: req.body.branch,
      graduationYear: req.body.graduationYear,
      skills: req.body.skills,
      interestes: req.body.interestes,
      currentLocation: req.body.currentLocation,
      preferredMode: req.body.preferredMode,
      preferredCategories: req.body.preferredCategories
    };

    // Find the user by their ID and update only the fields provided
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      returnDocument: 'after', // Fixed Mongoose Deprecation Warning!
      runValidators: true // Run Mongoose validations again
    });

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
