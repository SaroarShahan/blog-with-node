const express = require('express');

const { authenticateToken } = require('../middleware');
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.use(authenticateToken);

router.route('/').post(createComment);
router.route('/:postId').get(getCommentsByPost);
router.route('/:id').patch(updateComment);
router.route('/:id').delete(deleteComment);

module.exports = router;
