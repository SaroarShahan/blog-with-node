const tagService = require('../services/tagService');

/**
 * Create a tag.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {Object} res
 */
exports.createTag = (req, res) => {
  return tagService.createTag(req, res);
};

/**
 * Get all tags.
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllTags = (req, res) => {
  return tagService.getAllTags(req, res);
};

/**
 * Get a tag by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.getTag = (req, res) => {
  return tagService.getTag(req, res);
};

/**
 * Update a tag by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.body
 * @param {string} [req.body.name]
 * @param {Object} res
 */
exports.updateTag = (req, res) => {
  return tagService.updateTag(req, res);
};

/**
 * Delete a tag by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.deleteTag = (req, res) => {
  return tagService.deleteTag(req, res);
};
