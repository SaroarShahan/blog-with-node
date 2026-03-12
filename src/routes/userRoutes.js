const express = require('express');

const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware');

const router = express.Router();

router.get('/:userId/posts', userController.getUserPosts);

router.use([authenticateToken, isAdmin]);

router.route('/').post(userController.createUser).get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .patch(userController.updateProfile)
  .delete(userController.deleteUser);

module.exports = router;
