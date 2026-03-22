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
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .post(hasPermission('create_comment'), validate(createCommentSchema), createComment);
router
  .route('/:postId')
  .get(hasPermission('view_comments'), validate(getCommentsByPostSchema), getCommentsByPost);
router
  .route('/:id')
  .patch(hasPermission('edit_comment'), validate(updateCommentSchema), updateComment);
router
  .route('/:id')
  .delete(hasPermission('delete_comment'), validate(deleteCommentSchema), deleteComment);

module.exports = router;
