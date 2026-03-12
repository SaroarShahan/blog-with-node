'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostModel extends Model {
    static associate(models) {
      models.PostModel.belongsTo(models.UserModel, {
        foreignKey: 'userId',
        as: 'author',
      });
      models.PostModel.hasMany(models.CommentModel, {
        foreignKey: 'postId',
        as: 'comments',
      });
      models.PostModel.belongsToMany(models.CategoryModel, {
        through: models.PostCategoryModel,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'categories',
      });
      models.PostModel.belongsToMany(models.TagModel, {
        through: models.PostTagModel,
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags',
      });
    }
  }

  PostModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(200),
        field: 'title',
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(220),
        field: 'slug',
        allowNull: false,
        unique: true,
      },
      excerpt: {
        type: DataTypes.TEXT,
        field: 'excerpt',
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        field: 'content',
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        field: 'status',
        defaultValue: 'draft',
      },
      viewCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'view_count',
        defaultValue: 0,
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        field: 'published_at',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'PostModel',
      tableName: 'posts',
      timestamps: true,
      underscored: true,
    },
  );

  return PostModel;
};
