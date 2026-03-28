const postService = require('../services/postService');

/**
 * Create a post.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.title
 * @param {string} [req.body.excerpt]
 * @param {string} req.body.content
 * @param {string} [req.body.status]
 * @param {Array<number|string>} [req.body.categoryIds]
 * @param {Array<number|string>} [req.body.tagIds]
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {Object} res
 */
exports.createPost = (req, res) => {
  return postService.createPost(req, res);
};

/**
 * Get all posts with optional filters.
 * @param {Object} req
 * @param {Object} req.query
 * @param {string} [req.query.page]
 * @param {string} [req.query.limit]
 * @param {string} [req.query.category]
 * @param {string} [req.query.tag]
 * @param {string} [req.query.search]
 * @param {string} [req.query.status]
 * @param {Object} res
 */
exports.getAllPosts = (req, res) => {
  return postService.getAllPosts(req, res);
};

/**
 * Get a post by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} [req.user]
 * @param {number|string} [req.user.id]
 * @param {Object} res
 */
exports.getPost = (req, res) => {
  return postService.getPost(req, res);
};

/**
 * Update a post by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.body
 * @param {string} [req.body.title]
 * @param {string} [req.body.excerpt]
 * @param {string} [req.body.content]
 * @param {string} [req.body.status]
 * @param {Array<number|string>} [req.body.categoryIds]
 * @param {Array<number|string>} [req.body.tagIds]
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.updatePost = (req, res) => {
  return postService.updatePost(req, res);
};

/**
 * Publish a post by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.publishPost = (req, res) => {
  return postService.publishPost(req, res);
};

/**
 * Move a post back to draft by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.draftPost = (req, res) => {
  return postService.draftPost(req, res);
};

/**
 * Delete a post by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.user
 * @param {number|string} req.user.id
 * @param {string|null} req.user.role
 * @param {Object} res
 */
exports.deletePost = (req, res) => {
  return postService.deletePost(req, res);
};

/**
 * Get posts by category ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.getPostsByCategory = (req, res) => {
  return postService.getPostsByCategory(req, res);
};

/**
 * Get a category with its posts by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.getCategoryWithPosts = (req, res) => {
  return postService.getCategoryWithPosts(req, res);
};
