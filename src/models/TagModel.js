'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagModel extends Model {
    static associate(models) {
      models.TagModel.belongsToMany(models.PostModel, {
        through: models.PostTagModel,
        foreignKey: 'tagId',
        otherKey: 'postId',
        as: 'posts',
      });
    }
  }

  TagModel.init(
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
    },
    {
      sequelize,
      modelName: 'TagModel',
      tableName: 'tags',
      timestamps: true,
      underscored: true,
    },
  );

  return TagModel;
};
