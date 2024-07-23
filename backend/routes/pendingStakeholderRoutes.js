// routes/pendingStakeholderRoutes.js
const express = require('express');
const router = express.Router();
const { createPendingStakeholder,getPendingStakeholderByUsername,acceptPendingStakeholder,getPendingStakeholderByAddress } = require('../controllers/pendingStakeholderController');

router.post('/', createPendingStakeholder);
router.get('/:username', getPendingStakeholderByUsername);
router.post('/accept', acceptPendingStakeholder);
router.post('/find', getPendingStakeholderByAddress);

module.exports = router;
