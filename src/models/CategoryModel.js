'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryModel extends Model {
    static associate(models) {
      models.CategoryModel.belongsToMany(models.PostModel, {
        through: models.PostCategoryModel,
        foreignKey: 'categoryId',
        otherKey: 'postId',
        as: 'posts',
      });
    }
  }

  CategoryModel.init(
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
      slug: {
        type: DataTypes.STRING(120),
        field: 'slug',
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CategoryModel',
      tableName: 'categories',
      timestamps: true,
      underscored: true,
    },
  );

  return CategoryModel;
};
