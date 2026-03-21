'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PermissionModel extends Model {
    static associate(models) {
      models.PermissionModel.belongsToMany(models.RoleModel, {
        through: models.RolePermissionModel,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles',
      });
    }
  }

  PermissionModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        field: 'name',
        allowNull: false,
        unique: true,
      },
      label: {
        type: DataTypes.STRING(100),
        field: 'label',
        allowNull: false,
      },
      module: {
        type: DataTypes.STRING(100),
        field: 'module',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PermissionModel',
      tableName: 'permissions',
      underscored: true,
      timestamps: true,
    },
  );

  return PermissionModel;
};
