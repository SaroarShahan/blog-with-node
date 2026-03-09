'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        field: 'gender'
      },
      role: {
        type: Sequelize.STRING,
        field: 'role',
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};