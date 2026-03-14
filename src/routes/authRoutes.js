const express = require('express');

const { register, login } = require('../controllers/authController');
const { validate } = require('../middleware');
const { registerSchema, loginSchema } = require('../validations/authValidation');

const router = express.Router();

router.route('/register').post(validate(registerSchema), register);
router.route('/login').post(validate(loginSchema), login);

module.exports = router;
