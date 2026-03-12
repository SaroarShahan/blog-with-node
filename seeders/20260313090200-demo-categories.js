'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Backend',
        slug: 'backend',
        description: 'Node.js, databases, authentication, and API architecture.',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: 'Frontend',
        slug: 'frontend',
        description: 'UI engineering, accessibility, and browser-side patterns.',
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        name: 'DevOps',
        slug: 'devops',
        description: 'Deployment, CI/CD, monitoring, and infrastructure workflows.',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', {
      slug: ['backend', 'frontend', 'devops'],
    });
  },
};
