const express = require('express');

const postController = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.route('/').post([authenticateToken, postController.createPost]).get(postController.getAllPosts);
router.route('/:id').get(postController.getPost).patch([authenticateToken, postController.updatePost]).delete([authenticateToken, postController.deletePost]);

module.exports = router;