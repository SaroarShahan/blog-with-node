'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
        field: 'user_id',
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      firstName: {
        type: Sequelize.STRING(100),
        field: 'first_name',
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        field: 'last_name',
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
        field: 'bio',
        allowNull: true,
      },
      avatarUrl: {
        type: Sequelize.STRING(255),
        field: 'avatar_url',
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING(255),
        field: 'website',
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(100),
        field: 'location',
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        field: 'date_of_birth',
        allowNull: true,
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
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('profiles');
  },
};
