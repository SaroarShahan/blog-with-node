'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('post_tags', [
      {
        id: 1,
        post_id: 1,
        tag_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        post_id: 1,
        tag_id: 2,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        post_id: 1,
        tag_id: 3,
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        post_id: 2,
        tag_id: 3,
        created_at: now,
        updated_at: now,
      },
      {
        id: 5,
        post_id: 2,
        tag_id: 4,
        created_at: now,
        updated_at: now,
      },
      {
        id: 6,
        post_id: 3,
        tag_id: 5,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('post_tags', {
      id: [1, 2, 3, 4, 5, 6],
    });
  },
};
