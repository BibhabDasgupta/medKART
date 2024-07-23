const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HospitalsPharmacies = require('../models/HospitalsPharmacies');
const { registerSchema, loginSchema } = require('../utils/zodValidation');
const config = require('../config/config');

exports.register = async (req, res) => {
  const { actualName, address, email, mobileNumber, username, password, confirmPassword } = req.body;

  // Validate request body
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }

  // Check if manufacturer already exists
  const emailExists = await HospitalsPharmacies.findOne({ email });
  const usernameExists = await HospitalsPharmacies.findOne({ username });
  if (emailExists || usernameExists) {
    return res.status(400).send('Email or Username already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new manufacturer
  const hospitalspharmacies = new HospitalsPharmacies({
    actualName,
    address,
    email,
    mobileNumber,
    username,
    password: hashedPassword,
  });

  try {
    const savedhospitalspharmacies = await hospitalspharmacies.save();
    res.send({ hospitalspharmacies: hospitalspharmacies._id });
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
  const hospitalspharmacies = await HospitalsPharmacies.findOne({ username });
  if (!hospitalspharmacies) {
    return res.status(400).send('Username not found');
  }

  // Validate password
  const validPass = await bcrypt.compare(password, hospitalspharmacies.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign a token
  const token = jwt.sign({ _id: hospitalspharmacies._id }, config.jwtSecret, { expiresIn: '1h' });
  res.header('auth-token', token).send({ token });
};