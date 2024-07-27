const express = require('express');
const router = express.Router();
const { register, login, pendingRequests, sendAN,getAdminDetails } = require('../controllers/adminController');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/pending-requests', pendingRequests);
router.get('/details', getAdminDetails);

module.exports = router;