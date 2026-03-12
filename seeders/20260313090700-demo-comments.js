'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('comments', [
      {
        id: 1,
        content: 'This was a useful breakdown of how the associations fit together.',
        status: 'approved',
        post_id: 1,
        user_id: 2,
        parent_comment_id: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        content: 'Thanks. The next step is tightening validation and error handling.',
        status: 'approved',
        post_id: 1,
        user_id: 1,
        parent_comment_id: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        content: 'A short example of eager loading replies would make this even better.',
        status: 'approved',
        post_id: 2,
        user_id: 2,
        parent_comment_id: null,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('comments', {
      id: [1, 2, 3],
    });
  },
};
