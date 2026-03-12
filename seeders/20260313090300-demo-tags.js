'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('tags', [
      {
        id: 1,
        name: 'nodejs',
        slug: 'nodejs',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: 'express',
        slug: 'express',
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        name: 'sequelize',
        slug: 'sequelize',
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        name: 'mysql',
        slug: 'mysql',
        created_at: now,
        updated_at: now,
      },
      {
        id: 5,
        name: 'javascript',
        slug: 'javascript',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', {
      slug: ['nodejs', 'express', 'sequelize', 'mysql', 'javascript'],
    });
  },
};
