const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const { User } = require('../resources/users/user.model');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    // eslint-disable-next-line
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
  }
});
