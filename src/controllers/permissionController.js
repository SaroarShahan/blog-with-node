const permissionService = require('../services/permissionService');

/**
 * Get all permissions.
 * @param {Object} req
 * @param {Object} req.query
 * @param {string} [req.query.module]
 * @param {Object} res
 */
exports.getPermissions = (req, res) => {
  return permissionService.getPermissions(req, res);
};
