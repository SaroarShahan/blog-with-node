const commentService = require('../services/commentService');

/**
 * Create a comment for a post.
 * @param {Object} req
 * @param {Object} req.body
 * @param {number|string} req.body.postId
 * @param {number|string|null} [req.body.parentCommentId]
 * @param {string} req.body.content
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {Object} res
 */
exports.createComment = (req, res) => {
  return commentService.createComment(req, res);
};

/**
 * Get comments for a post.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.postId
 * @param {Object} res
 */
exports.getCommentsByPost = (req, res) => {
  return commentService.getCommentsByPost(req, res);
};

/**
 * Update a comment.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body
 * @param {string} [req.body.content]
 * @param {string} [req.body.status]
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.updateComment = (req, res) => {
  return commentService.updateComment(req, res);
};

/**
 * Delete a comment.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.deleteComment = (req, res) => {
  return commentService.deleteComment(req, res);
};
