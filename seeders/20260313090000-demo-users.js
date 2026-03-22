'use strict';

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const [adminPassword, userPassword] = await Promise.all([
      bcrypt.hash('Admin@1234', 10),
      bcrypt.hash('User@1234', 10),
    ]);
    const roles = await queryInterface.sequelize.query(
      `
        SELECT id, name
        FROM roles
        WHERE name IN ('super_admin', 'user')
      `,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    const superAdminRole = roles.find((role) => role.name === 'super_admin');
    const userRole = roles.find((role) => role.name === 'user');

    if (!superAdminRole || !userRole) {
      throw new Error('Required roles are not seeded yet. Seed roles before demo users.');
    }

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'SaroarShahan',
        email: 'saroar.shahan@gmail.com',
        password: adminPassword,
        gender: 'other',
        role_id: superAdminRole.id,
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
        role_id: userRole.id,
        status: 'active',
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Op.in]: ['saroar.shahan@gmail.com', 'kuddus@example.com'],
      },
    });
  },
};
