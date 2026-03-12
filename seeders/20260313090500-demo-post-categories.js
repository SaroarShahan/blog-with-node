'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('post_categories', [
      {
        id: 1,
        post_id: 1,
        category_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        post_id: 2,
        category_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        post_id: 2,
        category_id: 2,
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        post_id: 3,
        category_id: 2,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('post_categories', {
      id: [1, 2, 3, 4],
    });
  },
};
