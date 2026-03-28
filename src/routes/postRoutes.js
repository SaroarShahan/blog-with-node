const express = require('express');

const { authenticateToken, optionalAuthenticateToken, validate } = require('../middleware');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  publishPost,
  deletePost,
} = require('../controllers/postController');
const {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  publishPostSchema,
  updatePostSchema,
} = require('../validations/postValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, hasPermission('create_post'), validate(createPostSchema)], createPost)
  .get([optionalAuthenticateToken, validate(getPostsSchema)], getAllPosts);

router
  .route('/:idOrSlug/publish')
  .patch([authenticateToken, hasPermission('edit_post'), validate(publishPostSchema)], publishPost);

router
  .route('/:idOrSlug')
  .get([optionalAuthenticateToken, validate(getPostSchema)], getPost)
  .patch([authenticateToken, hasPermission('edit_post'), validate(updatePostSchema)], updatePost)
  .delete(
    [authenticateToken, hasPermission('delete_post'), validate(deletePostSchema)],
    deletePost,
  );

module.exports = router;
