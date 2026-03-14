const express = require('express');

const { register, login } = require('../controllers/authController');
const { loginRateLimiter, registerRateLimiter, validate } = require('../middleware');
const { registerSchema, loginSchema } = require('../validations/authValidation');

const router = express.Router();

router.route('/register').post(registerRateLimiter, validate(registerSchema), register);
router.route('/login').post(loginRateLimiter, validate(loginSchema), login);

module.exports = router;
