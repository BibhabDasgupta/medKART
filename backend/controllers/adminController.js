const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { registerSchema, loginSchema } = require('../utils/zodValidation');
const config = require('../config/config');
const PendingStakeholder = require('../models/PendingStakeholder');

exports.register = async (req, res) => {
  const { actualName, address, email, mobileNumber, username, password, confirmPassword } = req.body;

  // Validate request body
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }

  // Check if manufacturer already exists
  const emailExists = await Admin.findOne({ email });
  const usernameExists = await Admin.findOne({ username });
  if (emailExists || usernameExists) {
    return res.status(400).send('Email or Username already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new manufacturer
  const admin = new Admin({
    actualName,
    address,
    email,
    mobileNumber,
    username,
    password: hashedPassword,
  });

  try {
    const savedAdmin = await admin.save();
    res.send({ admin: admin._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }

  // Check if the manufacturer exists
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(400).send('Username not found');
  }

  // Validate password
  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign a token
  const token = jwt.sign({ _id: admin._id }, config.jwtSecret, { expiresIn: '1h' });
  res.header('auth-token', token).send({ token });
};


exports.pendingRequests = async (req, res) => {
  try {
    // Fetch all pending stakeholders from the database
    const pendingStakeholders = await PendingStakeholder.find(); // Assuming status = false means pending

    if (pendingStakeholders.length === 0) {
      return res.status(404).json({ message: 'No pending stakeholders found' });
    }

    res.status(200).json(pendingStakeholders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  exports.getAdminDetails = async (req, res) => {
    try {
      // Fetch the admin details from the database
      const admin = await Admin.findOne();
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.status(200).json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };