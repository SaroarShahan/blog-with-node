const { PermissionModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const getPermissions = asyncHandler(async (req, res) => {
  const where = {};

  if (req.query.module) {
    where.module = req.query.module;
  }

  const permissions = await PermissionModel.findAll({
    where,
    order: [
      ['module', 'ASC'],
      ['id', 'DESC'],
    ],
  });

  return res.status(200).json({
    success: true,
    count: permissions.length,
    permissions,
  });
});

module.exports = {
  getPermissions,
};
