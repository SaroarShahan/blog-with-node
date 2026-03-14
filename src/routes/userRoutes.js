const express = require('express');

const userController = require('../controllers/userController');
const { authenticateToken, isAdmin, validate } = require('../middleware');
const {
  createUserSchema,
  deleteUserSchema,
  getUserPostsSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} = require('../validations/userValidation');

const router = express.Router();

router.get('/:userId/posts', validate(getUserPostsSchema), userController.getUserPosts);

router.use([authenticateToken, isAdmin]);

router
  .route('/')
  .post(validate(createUserSchema), userController.createUser)
  .get(validate(getUsersSchema), userController.getAllUsers);

router
  .route('/:id')
  .get(validate(getUserSchema), userController.getUser)
  .patch(validate(updateUserSchema), userController.updateUser)
  .patch(validate(updateUserSchema), userController.updateProfile)
  .delete(validate(deleteUserSchema), userController.deleteUser);

module.exports = router;
