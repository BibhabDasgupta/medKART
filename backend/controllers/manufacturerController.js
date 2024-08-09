const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Manufacturer = require("../models/Manufacturer");
const Wholesaler = require("../models/Wholesaler");
const Distributor = require("../models/Distributor");
const HospitalsPharmacies = require("../models/HospitalsPharmacies");
const { registerSchema, loginSchema } = require("../utils/zodValidation");
const config = require("../config/config");

exports.register = async (req, res) => {
  const {
    actualName,
    address,
    email,
    mobileNumber,
    username,
    password,
    confirmPassword,
  } = req.body;

  // Validate request body
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }

  // Check if manufacturer already exists
  const emailExists = await Manufacturer.findOne({ email });
  const usernameExists = await Manufacturer.findOne({ username });
  const emailExists1 = await Wholesaler.findOne({ email });
  const usernameExists1 = await Wholesaler.findOne({ username });
  const emailExists2 = await Distributor.findOne({ email });
  const usernameExists2 = await Distributor.findOne({ username });
  const emailExists3 = await HospitalsPharmacies.findOne({ email });
  const usernameExists3 = await HospitalsPharmacies.findOne({ username });
  if (
    emailExists ||
    usernameExists ||
    emailExists1 ||
    usernameExists1 ||
    emailExists2 ||
    usernameExists2 ||
    emailExists3 ||
    usernameExists3
  ) {
    return res.status(400).send("Email or Username already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new manufacturer
  const manufacturer = new Manufacturer({
    actualName,
    address,
    email,
    mobileNumber,
    username,
    password: hashedPassword,
  });

  try {
    const savedManufacturer = await manufacturer.save();
    res.send({ manufacturer: manufacturer._id });
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
  const manufacturer = await Manufacturer.findOne({ username });
  if (!manufacturer) {
    return res.status(400).send("Username not found");
  }

  // Validate password
  const validPass = await bcrypt.compare(password, manufacturer.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }

  // Create and assign a token
  const token = jwt.sign({ _id: manufacturer._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.header("auth-token", token).send({ token });
};

exports.fetchDetails = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the manufacturer by username
    const manufacturer = await Manufacturer.findOne({ username });

    if (!manufacturer) {
      return res.status(404).send("Manufacturer not found");
    }

    // Send the manufacturer details (excluding the password)
    res.json({
      username: manufacturer.username,
      name: manufacturer.actualName,
      address: manufacturer.address,
      email: manufacturer.email,
      mobileNumber: manufacturer.mobileNumber,
      role: "Manufacturer",
      formSubmitted: manufacturer.formSubmitted,
      status: manufacturer.status
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};