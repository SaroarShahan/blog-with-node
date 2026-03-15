const categoryService = require('../services/categoryService');

/**
 * Create a category.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} [req.body.description]
 * @param {Object} res
 */
exports.createCategory = (req, res) => {
  return categoryService.createCategory(req, res);
};

/**
 * Get all categories.
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllCategories = (req, res) => {
  return categoryService.getAllCategories(req, res);
};

/**
 * Get a category by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.getCategory = (req, res) => {
  return categoryService.getCategory(req, res);
};

/**
 * Update a category by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} req.body
 * @param {string} [req.body.name]
 * @param {string} [req.body.description]
 * @param {Object} res
 */
exports.updateCategory = (req, res) => {
  return categoryService.updateCategory(req, res);
};

/**
 * Delete a category by ID or slug.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.idOrSlug
 * @param {Object} res
 */
exports.deleteCategory = (req, res) => {
  return categoryService.deleteCategory(req, res);
};
