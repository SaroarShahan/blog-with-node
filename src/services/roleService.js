const { PermissionModel, RoleModel, UserModel, sequelize } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const roleInclude = [
  {
    model: PermissionModel,
    as: 'permissions',
    attributes: ['id', 'name', 'label', 'module'],
    through: { attributes: [] },
  },
];

const findRoleById = (id) => {
  return RoleModel.findByPk(id, {
    include: roleInclude,
  });
};

const getValidPermissions = async (permissionIds, transaction) => {
  const uniquePermissionIds = [...new Set(permissionIds)];
  const permissions = await PermissionModel.findAll({
    where: { id: uniquePermissionIds },
    transaction,
  });

  return { permissions, uniquePermissionIds };
};

const createRole = asyncHandler(async (req, res) => {
  const { name, permissions = [] } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Role name is required',
    });
  }

  if (!permissions.length) {
    return res.status(400).json({
      success: false,
      message: 'At least one permission is required',
    });
  }

  const existingRole = await RoleModel.findOne({ where: { name } });

  if (existingRole) {
    return res.status(409).json({
      success: false,
      message: 'Role with this name already exists',
    });
  }

  const transaction = await sequelize.transaction();

  try {
    const { permissions: permissionRows, uniquePermissionIds } = await getValidPermissions(
      permissions,
      transaction,
    );

    if (permissionRows.length !== uniquePermissionIds.length) {
      await transaction.rollback();

      return res.status(400).json({
        success: false,
        message: 'One or more permissions are invalid',
      });
    }

    const role = await RoleModel.create(
      {
        name,
        permissionIds: uniquePermissionIds,
      },
      { transaction },
    );

    await role.setPermissions(permissionRows, { transaction });
    await transaction.commit();

    const createdRole = await findRoleById(role.id);

    return res.status(201).json({
      success: true,
      message: 'Role created successfully',
      role: createdRole,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});

const getRoles = asyncHandler(async (_req, res) => {
  const roles = await RoleModel.findAll({
    include: roleInclude,
    order: [['id', 'DESC']],
  });

  return res.status(200).json({
    success: true,
    count: roles.length,
    roles,
  });
});

const getRole = asyncHandler(async (req, res) => {
  const role = await findRoleById(req.params.id);

  if (!role) {
    return res.status(404).json({
      success: false,
      message: `Role not found with id of ${req.params.id}`,
    });
  }

  return res.status(200).json({
    success: true,
    role,
  });
});

const updateRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Role name is required',
    });
  }

  const role = await RoleModel.findByPk(req.params.id);

  if (!role) {
    return res.status(404).json({
      success: false,
      message: `Role not found with id of ${req.params.id}`,
    });
  }

  const existingRole = await RoleModel.findOne({
    where: { name },
  });

  if (existingRole && existingRole.id !== role.id) {
    return res.status(409).json({
      success: false,
      message: 'Role with this name already exists',
    });
  }

  const transaction = await sequelize.transaction();

  try {
    let permissionRows = null;
    let uniquePermissionIds = null;

    if (typeof permissions !== 'undefined') {
      if (!Array.isArray(permissions) || permissions.length === 0) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: 'At least one permission is required',
        });
      }

      const permissionResult = await getValidPermissions(permissions, transaction);
      permissionRows = permissionResult.permissions;
      uniquePermissionIds = permissionResult.uniquePermissionIds;

      if (permissionRows.length !== uniquePermissionIds.length) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: 'One or more permissions are invalid',
        });
      }
    }

    await role.update(
      {
        name,
        permissionIds: uniquePermissionIds ?? role.permissionIds,
      },
      { transaction },
    );

    if (permissionRows) {
      await role.setPermissions(permissionRows, { transaction });
    }

    await transaction.commit();

    const updatedRole = await findRoleById(role.id);

    return res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      role: updatedRole,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});

const deleteRole = asyncHandler(async (req, res) => {
  const role = await RoleModel.findByPk(req.params.id);

  if (!role) {
    return res.status(404).json({
      success: false,
      message: `Role not found with id of ${req.params.id}`,
    });
  }

  const usersWithRole = await UserModel.count({
    where: { roleId: req.params.id },
  });

  if (usersWithRole > 0) {
    const userOrUsers = usersWithRole === 1 ? 'user' : 'users';

    return res.status(400).json({
      success: false,
      message: `Cannot delete role: It is currently assigned to ${usersWithRole} ${userOrUsers}.`,
    });
  }

  await role.destroy();

  return res.status(200).json({
    success: true,
    message: 'Role deleted successfully',
  });
});

module.exports = {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
};
