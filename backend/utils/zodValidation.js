const { z } = require('zod');

const registerSchema = z.object({
  actualName: z.string().min(3, 'Name should be at least 3 characters long'),
  address: z.string().min(5, 'Address should be at least 5 characters long'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password should be at least 6 characters long'),
});

const loginSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
});

module.exports = { registerSchema, loginSchema };
