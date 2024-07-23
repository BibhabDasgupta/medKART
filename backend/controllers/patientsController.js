const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patients = require('../models/PAtients');
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
  const emailExists = await Patients.findOne({ email });
  const usernameExists = await Patients.findOne({ username });
  if (emailExists || usernameExists) {
    return res.status(400).send('Email or Username already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new manufacturer
  const patients = new Patients({
    actualName,
    address,
    email,
    mobileNumber,
    username,
    password: hashedPassword,
  });

  try {
    const savedPatients = await patients.save();
    res.send({ patients: patients._id });
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
  const patients = await Patients.findOne({ username });
  if (!patients) {
    return res.status(400).send('Username not found');
  }

  // Validate password
  const validPass = await bcrypt.compare(password, patients.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign a token
  const token = jwt.sign({ _id: patients._id }, config.jwtSecret, { expiresIn: '1h' });
  res.header('auth-token', token).send({ token });
};