const { User } = require('../users/user.model');
const { UNAUTHORIZED, FORBIDDEN } = require('http-status-codes');

const loginUser = async (login, password) => {
  // Validate email & password
  if (!login || !password) {
    return {
      errorStatus: UNAUTHORIZED,
    };
  }

  // Check for user
  const user = await User.findOne({ login }).select('+password');

  if (!user) {
    return {
      errorStatus: FORBIDDEN,
    };
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return {
      errorStatus: UNAUTHORIZED,
    };
  }

  const token = await user.getSignedJwtToken();

  return token;
};

module.exports = { loginUser };
