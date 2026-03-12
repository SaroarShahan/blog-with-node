'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTagModel extends Model {
    static associate(models) {
      // define association here
    }
  }

  PostTagModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
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
      tagId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'tag_id',
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'PostTagModel',
      tableName: 'post_tags',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['post_id', 'tag_id'],
        },
      ],
    },
  );

  return PostTagModel;
};
