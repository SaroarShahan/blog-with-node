'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommentModel extends Model {
    static associate(models) {
      models.CommentModel.belongsTo(models.UserModel, {
        foreignKey: 'userId',
        as: 'author',
      });
      models.CommentModel.belongsTo(models.PostModel, {
        foreignKey: 'postId',
        as: 'post',
      });
      models.CommentModel.belongsTo(models.CommentModel, {
        foreignKey: 'parentCommentId',
        as: 'parentComment',
      });
      models.CommentModel.hasMany(models.CommentModel, {
        foreignKey: 'parentCommentId',
        as: 'replies',
      });
    }
  }

  CommentModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        field: 'content',
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        field: 'status',
        defaultValue: 'pending',
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
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      parentCommentId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: 'parent_comment_id',
        references: {
          model: 'comments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'CommentModel',
      tableName: 'comments',
      timestamps: true,
      underscored: true,
    },
  );

  return CommentModel;
};
