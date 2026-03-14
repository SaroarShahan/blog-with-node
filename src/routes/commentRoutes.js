const express = require('express');

const { authenticateToken, validate } = require('../middleware');
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsByPostSchema,
  updateCommentSchema,
} = require('../validations/commentValidation');

const router = express.Router();

router.use(authenticateToken);

router.route('/').post(validate(createCommentSchema), createComment);
router.route('/:postId').get(validate(getCommentsByPostSchema), getCommentsByPost);
router.route('/:id').patch(validate(updateCommentSchema), updateComment);
router.route('/:id').delete(validate(deleteCommentSchema), deleteComment);

module.exports = router;
