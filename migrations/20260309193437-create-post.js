'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(200),
        field: 'title',
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(220),
        field: 'slug',
        allowNull: false,
        unique: true,
      },
      excerpt: {
        type: Sequelize.TEXT,
        field: 'excerpt',
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT('long'),
        field: 'content',
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
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
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        field: 'status',
        defaultValue: 'draft',
      },
      viewCount: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'view_count',
        defaultValue: 0,
        allowNull: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
        field: 'published_at',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
