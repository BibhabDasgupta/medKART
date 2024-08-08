// routes/pendingStakeholderRoutes.js
const express = require('express');
const router = express.Router();
const { createPendingStakeholder,getPendingStakeholderByUsername,acceptPendingStakeholder,getPendingStakeholderByAddress,removeStakeholder } = require('../controllers/pendingStakeholderController');

router.post('/', createPendingStakeholder);
router.get('/:username', getPendingStakeholderByUsername);
router.post('/accept', acceptPendingStakeholder);
router.post('/find', getPendingStakeholderByAddress);
router.delete('/reject/:id',removeStakeholder)

module.exports = router;
