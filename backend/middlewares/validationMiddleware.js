const { loginSchema, registerSchema } = require('../utils/zodValidation');

const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  next();
};

const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  next();
};

module.exports = { validateLogin, validateRegister };
