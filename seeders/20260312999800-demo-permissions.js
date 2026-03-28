'use strict';

const { Op } = require('sequelize');

const permissions = [
  {
    id: 1,
    name: 'manage_user',
    label: 'Manage user',
    module: 'user',
  },
  {
    id: 2,
    name: 'create_user',
    label: 'Create user',
    module: 'user',
  },
  {
    id: 3,
    name: 'view_user',
    label: 'View user',
    module: 'user',
  },
  {
    id: 4,
    name: 'edit_user',
    label: 'Edit user',
    module: 'user',
  },
  {
    id: 5,
    name: 'delete_user',
    label: 'Delete user',
    module: 'user',
  },
  {
    id: 6,
    name: 'manage_profile',
    label: 'Manage profile',
    module: 'profile',
  },
  {
    id: 7,
    name: 'view_profile',
    label: 'View profile',
    module: 'profile',
  },
  {
    id: 8,
    name: 'edit_profile',
    label: 'Edit profile',
    module: 'profile',
  },
  {
    id: 9,
    name: 'manage_post',
    label: 'Manage post',
    module: 'post',
  },
  {
    id: 10,
    name: 'create_post',
    label: 'Create post',
    module: 'post',
  },
  {
    id: 11,
    name: 'view_post',
    label: 'View post',
    module: 'post',
  },
  {
    id: 12,
    name: 'edit_post',
    label: 'Edit post',
    module: 'post',
  },
  {
    id: 13,
    name: 'delete_post',
    label: 'Delete post',
    module: 'post',
  },
  {
    id: 14,
    name: 'manage_category',
    label: 'Manage category',
    module: 'category',
  },
  {
    id: 15,
    name: 'create_category',
    label: 'Create category',
    module: 'category',
  },
  {
    id: 16,
    name: 'view_category',
    label: 'View category',
    module: 'category',
  },
  {
    id: 17,
    name: 'edit_category',
    label: 'Edit category',
    module: 'category',
  },
  {
    id: 18,
    name: 'delete_category',
    label: 'Delete category',
    module: 'category',
  },
  {
    id: 19,
    name: 'manage_tag',
    label: 'Manage tag',
    module: 'tag',
  },
  {
    id: 20,
    name: 'create_tag',
    label: 'Create tag',
    module: 'tag',
  },
  {
    id: 21,
    name: 'view_tag',
    label: 'View tag',
    module: 'tag',
  },
  {
    id: 22,
    name: 'edit_tag',
    label: 'Edit tag',
    module: 'tag',
  },
  {
    id: 23,
    name: 'delete_tag',
    label: 'Delete tag',
    module: 'tag',
  },
  {
    id: 24,
    name: 'manage_comment',
    label: 'Manage comment',
    module: 'comment',
  },
  {
    id: 25,
    name: 'create_comment',
    label: 'Create comment',
    module: 'comment',
  },
  {
    id: 26,
    name: 'view_comment',
    label: 'View comment',
    module: 'comment',
  },
  {
    id: 27,
    name: 'edit_comment',
    label: 'Edit comment',
    module: 'comment',
  },
  {
    id: 28,
    name: 'delete_comment',
    label: 'Delete comment',
    module: 'comment',
  },
];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'permissions',
      permissions.map((permission) => ({
        ...permission,
        created_at: now,
        updated_at: now,
      })),
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', {
      name: {
        [Op.in]: permissions.map((permission) => permission.name),
      },
    });
  },
};
