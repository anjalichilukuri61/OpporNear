const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if the frontend sent a token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. If no token, deny access
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // 3. Verify the token is valid (not expired, not faked)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user in the database using the ID inside the token
    req.user = await User.findById(decoded.id);

    // 5. Move on to the next function (the controller)
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};
