const express = require('express');

const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.route('/').get([authenticateToken, profileController.getProfile])
router.route("/update").patch([authenticateToken, profileController.updateProfile]);

module.exports = router;