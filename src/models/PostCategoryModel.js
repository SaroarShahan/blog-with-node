'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostCategoryModel extends Model {
    static associate(_models) {
      // define association here
    }
  }

  PostCategoryModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'post_id',
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'PostCategoryModel',
      tableName: 'post_categories',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['post_id', 'category_id'],
        },
      ],
    },
  );

  return PostCategoryModel;
};
