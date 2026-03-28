'use strict';

const { Op } = require('sequelize');

const SUPER_ADMIN_ROLE_ID = 1;
const USER_ROLE_ID = 2;

const superAdminPermissionIds = Array.from({ length: 28 }, (_, index) => index + 1);
const userPermissionIds = [7, 8, 10, 11, 12, 13, 25, 26, 27, 28];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const superAdminMappings = superAdminPermissionIds.map((permissionId, index) => ({
      id: index + 1,
      role_id: SUPER_ADMIN_ROLE_ID,
      permission_id: permissionId,
      created_at: now,
      updated_at: now,
    }));

    const userMappings = userPermissionIds.map((permissionId, index) => ({
      id: superAdminMappings.length + index + 1,
      role_id: USER_ROLE_ID,
      permission_id: permissionId,
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert('role_permissions', [...superAdminMappings, ...userMappings]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('role_permissions', {
      role_id: {
        [Op.in]: [SUPER_ADMIN_ROLE_ID, USER_ROLE_ID],
      },
    });
  },
};
