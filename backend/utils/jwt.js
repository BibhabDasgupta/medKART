const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
};

module.exports = { generateToken };
