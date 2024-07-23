// models/PendingStakeholder.js
const mongoose = require('mongoose');

const PendingStakeholderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  role: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: false } ,
  formSubmitted:{type: Boolean, default: true },
  accountNumber:{type: String, default:''},
});

module.exports = mongoose.model('PendingStakeholder', PendingStakeholderSchema);
