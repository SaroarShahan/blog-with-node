'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfileModel extends Model {
    static associate(models) {
      models.ProfileModel.belongsTo(models.UserModel, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  ProfileModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'user_id',
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: 'first_name',
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        field: 'last_name',
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        field: 'bio',
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        field: 'avatar_url',
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(255),
        field: 'website',
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        field: 'location',
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        field: 'date_of_birth',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'ProfileModel',
      tableName: 'profiles',
      underscored: true,
      timestamps: true,
    },
  );

  return ProfileModel;
};
