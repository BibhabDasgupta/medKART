const express = require('express');
const router = express.Router();
const { register, login,fetchDetails } = require('../controllers/wholesalerController');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/:username', fetchDetails);

module.exports = router;