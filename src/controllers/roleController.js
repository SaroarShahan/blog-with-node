const roleService = require('../services/roleService');

/**
 * Create a role.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {Array<number>} req.body.permissions
 * @param {Object} res
 */
exports.createRole = (req, res) => {
  return roleService.createRole(req, res);
};

/**
 * Get all roles.
 * @param {Object} req
 * @param {Object} res
 */
exports.getRoles = (req, res) => {
  return roleService.getRoles(req, res);
};

/**
 * Get a role by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} res
 */
exports.getRole = (req, res) => {
  return roleService.getRole(req, res);
};

/**
 * Update a role by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {Array<number>} [req.body.permissions]
 * @param {Object} res
 */
exports.updateRole = (req, res) => {
  return roleService.updateRole(req, res);
};

/**
 * Delete a role by ID.
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} res
 */
exports.deleteRole = (req, res) => {
  return roleService.deleteRole(req, res);
};
