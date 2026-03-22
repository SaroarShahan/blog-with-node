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
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .post([hasPermission('create_post'), validate(createPostSchema)], createPost)
  .get([hasPermission('view_post')], validate(getPostsSchema), getAllPosts);

router
  .route('/:idOrSlug')
  .get([hasPermission('view_post')], validate(getPostSchema), getPost)
  .patch([hasPermission('edit_post'), validate(updatePostSchema)], updatePost)
  .delete([hasPermission('delete_post'), validate(deletePostSchema)], deletePost);

module.exports = router;
