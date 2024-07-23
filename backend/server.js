const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const wholesalerRoutes = require('./routes/wholesalerRoutes');
const distributorRoutes = require('./routes/distributorRoutes'); // Ensure this import is correct
const hospitalspharmaciesRoutes = require('./routes/hospitalspharmaciesRoutes');
const patientsRoutes = require('./routes/patientsRoutes');
const adminRoutes=require('./routes/adminRoutes')
const pendingStakeholderRoutes = require('./routes/pendingStakeholderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/wholesalers', wholesalerRoutes);
app.use('/api/distributors', distributorRoutes);
app.use('/api/hospitalspharmacies', hospitalspharmaciesRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/pendingStakeholders', pendingStakeholderRoutes);

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

