const express = require('express');

const { authenticateToken } = require('../middleware');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

router.route('/').post([authenticateToken], createPost).get(getAllPosts);

router
  .route('/:idOrSlug')
  .get(getPost)
  .patch([authenticateToken], updatePost)
  .delete([authenticateToken], deletePost);

module.exports = router;
