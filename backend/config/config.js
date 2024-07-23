require('dotenv').config();

module.exports = {
  dbURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
