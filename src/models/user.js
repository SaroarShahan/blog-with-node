'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  UserModel.init({
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      field: 'gender'
    },
    role: {
      type: DataTypes.STRING,
      field: 'role',
      defaultValue: 'user'
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'UserModel',
    tableName: 'users',
    timestamps: true,
  });

  return UserModel;
};