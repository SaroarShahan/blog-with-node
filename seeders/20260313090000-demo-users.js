'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const [adminPassword, userPassword] = await Promise.all([
      bcrypt.hash('Admin@1234', 10),
      bcrypt.hash('User@1234', 10),
    ]);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'SaroarShahan',
        email: 'saroar.shahan@gmail.com',
        password: adminPassword,
        gender: 'other',
        role: 'admin',
        status: 'active',
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
      {
        id: 2,
        username: 'kuddus',
        email: 'kuddus@example.com',
        password: userPassword,
        gender: 'male',
        role: 'user',
        status: 'active',
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['saroar.shahan@gmail.com', 'kuddus@example.com'],
    });
  },
};
