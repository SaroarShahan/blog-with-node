'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermissionModel extends Model {
    static associate(models) {
      models.RolePermissionModel.belongsTo(models.RoleModel, {
        foreignKey: 'roleId',
        as: 'role',
      });
      models.RolePermissionModel.belongsTo(models.PermissionModel, {
        foreignKey: 'permissionId',
        as: 'permission',
      });
    }
  }

  RolePermissionModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'role_id',
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'permission_id',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RolePermissionModel',
      tableName: 'role_permissions',
      underscored: true,
      timestamps: true,
    },
  );

  return RolePermissionModel;
};
