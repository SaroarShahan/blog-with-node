'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('profiles', [
      {
        id: 1,
        user_id: 1,
        first_name: 'Site',
        last_name: 'Admin',
        bio: 'Administrator account for the blog platform.',
        avatar_url: 'https://example.com/avatars/admin.png',
        website: 'https://example.com',
        location: 'Dhaka',
        date_of_birth: '1995-01-15',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        user_id: 2,
        first_name: 'Kuddus',
        last_name: 'Boyati',
        bio: 'Writes about backend engineering and API design.',
        avatar_url: 'https://example.com/avatars/saroar.png',
        website: 'https://blog.example.com',
        location: 'Chattogram',
        date_of_birth: '1998-04-10',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('profiles', {
      user_id: [1, 2],
    });
  },
};
