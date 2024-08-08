// controllers/pendingStakeholderController.js
const PendingStakeholder = require('../models/PendingStakeholder');

exports.createPendingStakeholder = async (req, res) => {
  const { username, name, address, email, mobileNumber, role, accountNumber } = req.body;

  const pendingStakeholder = new PendingStakeholder({
    username,
    name,
    address,
    email,
    mobileNumber,
    role,
    accountNumber
  });

  try {
    const savedPendingStakeholder = await pendingStakeholder.save();
    res.status(201).json(savedPendingStakeholder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPendingStakeholderByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const stakeholder = await PendingStakeholder.findOne({ username });
      if (!stakeholder) {
        return res.status(404).json({ error: 'Stakeholder not found' });
      }
      res.status(200).json(stakeholder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.acceptPendingStakeholder = async (req, res) => {
    const { username } = req.body;
  
    try {
      const stakeholder = await PendingStakeholder.findOne({ username });
  
      if (!stakeholder) {
        return res.status(404).json({ message: 'Stakeholder not found' });
      }
  
      // Update the status and convert the account number to lowercase
      stakeholder.status = true;
      stakeholder.accountNumber = stakeholder.accountNumber.toLowerCase();
      await stakeholder.save();
  
      res.status(200).json({ message: 'Stakeholder accepted successfully' });
    } catch (error) {
      console.error('Error accepting stakeholder:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  exports.getPendingStakeholderByAddress = async (req, res) => {
    const { accountNumber } = req.body;
    try {
      const stakeholder = await PendingStakeholder.findOne({ accountNumber });
      if (!stakeholder) {
        return res.status(404).json({ error: 'Stakeholder not found' });
      }
      res.status(200).json(stakeholder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.removeStakeholder = async (req, res) => {
    const stakeholderId = req.params.id; 
    try {
      const removedStakeholder = await PendingStakeholder.findByIdAndDelete(stakeholderId);
      
      if (!removedStakeholder) {
        return res.status(404).json({ error: 'Stakeholder not found' });
      }
  
      res.status(200).json({ message: 'Stakeholder removed successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  