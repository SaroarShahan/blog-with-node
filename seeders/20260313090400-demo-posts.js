'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('posts', [
      {
        id: 1,
        title: 'Building a Blog API with Express and Sequelize',
        slug: 'building-a-blog-api-with-express-and-sequelize',
        excerpt:
          'A practical walkthrough for structuring an Express API with Sequelize models and relationships.',
        content:
          'This post covers project structure, model associations, migrations, authentication, and pragmatic controller patterns for a blog API built with Express and Sequelize.',
        user_id: 1,
        status: 'published',
        view_count: 24,
        published_at: now,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        title: 'Designing Category and Tag Relationships',
        slug: 'designing-category-and-tag-relationships',
        excerpt: 'How to model many-to-many post relationships cleanly using join tables.',
        content:
          'Categories and tags serve different purposes. This article shows how to model both with Sequelize belongsToMany associations and keep API responses predictable.',
        user_id: 2,
        status: 'published',
        view_count: 13,
        published_at: now,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        title: 'Draft Notes on Improving Comment Threads',
        slug: 'draft-notes-on-improving-comment-threads',
        excerpt: 'An internal draft about threading, moderation, and nested comment rendering.',
        content:
          'This draft explores parent-child comment structures, moderation states, and how to fetch top-level comments with nested replies in one query.',
        user_id: 2,
        status: 'draft',
        view_count: 0,
        published_at: null,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts', {
      slug: [
        'building-a-blog-api-with-express-and-sequelize',
        'designing-category-and-tag-relationships',
        'draft-notes-on-improving-comment-threads',
      ],
    });
  },
};
