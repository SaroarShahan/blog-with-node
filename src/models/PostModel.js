'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostModel extends Model {
    static associate(models) {
      models.UserModel.hasMany(models.PostModel, {
        foreignKey: "userId",
        as: "posts"
      });
      models.PostModel.belongsTo(models.UserModel, {
        foreignKey: "userId",
        as: "author"
      });
    }
  }

  PostModel.init(
    {
      title: {
        type: DataTypes.STRING,
        field: "title",
        allowNull: false
      },
      shortContent: {
        type: DataTypes.TEXT,
        field: "short_content",
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT("long"),
        field: "content",
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "PostModel",
      tableName: "posts",
      timestamps: true
    }
  );

  return PostModel;
};