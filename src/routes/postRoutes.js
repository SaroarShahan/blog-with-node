const express = require('express');

const { authenticateToken, validate } = require('../middleware');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
} = require('../validations/postValidation');

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, validate(createPostSchema)], createPost)
  .get(validate(getPostsSchema), getAllPosts);

router
  .route('/:idOrSlug')
  .get(validate(getPostSchema), getPost)
  .patch([authenticateToken, validate(updatePostSchema)], updatePost)
  .delete([authenticateToken, validate(deletePostSchema)], deletePost);

module.exports = router;
