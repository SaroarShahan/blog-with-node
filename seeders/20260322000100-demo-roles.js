'use strict';

const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'super_admin',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: 'user',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', {
      name: {
        [Op.in]: ['super_admin', 'user'],
      },
    });
  },
};
