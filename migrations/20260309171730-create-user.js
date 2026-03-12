'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(50),
        field: 'username',
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(100),
        field: 'email',
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        field: 'password',
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        field: 'gender',
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        field: 'role',
        defaultValue: 'user',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'blocked'),
        field: 'status',
        defaultValue: 'active',
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
