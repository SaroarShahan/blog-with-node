'use strict';
const { Model } = require('sequelize');
const { USER_ROLES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {
    static associate(models) {
      models.UserModel.hasOne(models.ProfileModel, {
        foreignKey: 'userId',
        as: 'profile',
      });
      models.UserModel.hasMany(models.PostModel, {
        foreignKey: 'userId',
        as: 'posts',
      });
      models.UserModel.hasMany(models.CommentModel, {
        foreignKey: 'userId',
        as: 'comments',
      });
    }
  }

  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        field: 'username',
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        field: 'email',
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password',
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        field: 'gender',
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(USER_ROLES.USER, USER_ROLES.ADMIN),
        field: 'role',
        defaultValue: USER_ROLES.USER,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        field: 'status',
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'UserModel',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return UserModel;
};
