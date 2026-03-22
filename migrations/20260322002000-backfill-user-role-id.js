'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE users
      SET role_id = (
        SELECT roles.id
        FROM roles
        WHERE roles.name = CASE
          WHEN users.role = 'admin' THEN 'super_admin'
          ELSE users.role
        END
        LIMIT 1
      )
      WHERE users.role IS NOT NULL
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE users
      SET role_id = NULL
    `);
  },
};
