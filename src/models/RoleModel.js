'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleModel extends Model {
    static associate(models) {
      models.RoleModel.belongsToMany(models.PermissionModel, {
        through: models.RolePermissionModel,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
      });
      models.RoleModel.hasMany(models.UserModel, {
        foreignKey: 'roleId',
        as: 'users',
      });
    }
  }

  RoleModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      label: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'RoleModel',
      tableName: 'roles',
      timestamps: true,
      underscored: true,
    },
  );

  return RoleModel;
};
