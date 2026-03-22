const authService = require('../services/authService');

/**
 * Register a new user account.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.username
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} [req.body.gender]
 * @param {number} [req.body.roleId]
 * @param {Object} res
 */
exports.register = (req, res) => {
  return authService.register(req, res);
};

/**
 * Authenticate a user and return an access token.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {Object} res
 */
exports.login = (req, res) => {
  return authService.login(req, res);
};
