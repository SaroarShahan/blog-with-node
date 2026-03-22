const express = require('express');

const userController = require('../controllers/userController');
const { authenticateToken, validate } = require('../middleware');
const {
  createUserSchema,
  deleteUserSchema,
  getUserPostsSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} = require('../validations/userValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.get('/:userId/posts', validate(getUserPostsSchema), userController.getUserPosts);

router.use(authenticateToken);

router
  .route('/')
  .post(hasPermission('create_user'), validate(createUserSchema), userController.createUser)
  .get(hasPermission('view_users'), validate(getUsersSchema), userController.getAllUsers);

router
  .route('/:id')
  .get(hasPermission('view_user'), validate(getUserSchema), userController.getUser)
  .patch(hasPermission('edit_user'), validate(updateUserSchema), userController.updateUser)
  .delete(hasPermission('delete_user'), validate(deleteUserSchema), userController.deleteUser);

router
  .route('/:id/profile')
  .patch(hasPermission('edit_user'), validate(updateUserSchema), userController.updateProfile);

module.exports = router;
