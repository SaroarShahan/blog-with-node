'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const table = await queryInterface.describeTable('roles');

    if (table.label) {
      await queryInterface.removeColumn('roles', 'label');
    }

    if (table.description) {
      await queryInterface.removeColumn('roles', 'description');
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('roles');

    if (!table.label) {
      await queryInterface.addColumn('roles', 'label', {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: '',
      });
    }

    if (!table.description) {
      await queryInterface.addColumn('roles', 'description', {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }
  },
};
