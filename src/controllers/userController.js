const userService = require('../services/userService');

/**
 * Create a user.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.username
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} [req.body.gender]
 * @param {number} [req.body.roleId]
 * @param {Object} res
 */
exports.createUser = (req, res) => {
  return userService.createUser(req, res);
};

/**
 * Get all users with optional filters.
 * @param {Object} req
 * @param {Object} req.query
 * @param {string} [req.query.page]
 * @param {string} [req.query.limit]
 * @param {string} [req.query.search]
 * @param {string} [req.query.status]
 * @param {number} [req.query.roleId]
 * @param {Object} res
 */
exports.getAllUsers = (req, res) => {
  return userService.getAllUsers(req, res);
};

/**
 * Get a user by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} res
 */
exports.getUser = (req, res) => {
  return userService.getUser(req, res);
};

/**
 * Get posts for a user.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.userId
 * @param {Object} res
 */
exports.getUserPosts = (req, res) => {
  return userService.getUserPosts(req, res);
};

/**
 * Update a user by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body
 * @param {string} [req.body.username]
 * @param {string} [req.body.gender]
 * @param {number} [req.body.roleId]
 * @param {string} [req.body.status]
 * @param {Object} res
 */
exports.updateUser = (req, res) => {
  return userService.updateUser(req, res);
};

/**
 * Update a user's profile.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body
 * @param {string} [req.body.firstName]
 * @param {string} [req.body.lastName]
 * @param {string} [req.body.bio]
 * @param {string} [req.body.avatarUrl]
 * @param {string} [req.body.website]
 * @param {string} [req.body.location]
 * @param {string} [req.body.dateOfBirth]
 * @param {Object} res
 */
exports.updateProfile = (req, res) => {
  return userService.updateProfile(req, res);
};

/**
 * Delete a user by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} res
 */
exports.deleteUser = (req, res) => {
  return userService.deleteUser(req, res);
};
