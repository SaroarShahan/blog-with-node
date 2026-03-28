const { z } = require('zod');

const { idOrSlugParamSchema, pageLimitQuerySchema } = require('./common');

const postStatusSchema = z.enum(['draft', 'published', 'archived']);

const createPostSchema = {
  body: z
    .object({
      title: z.string().trim().min(1).max(200),
      excerpt: z.string().trim().max(2000).optional(),
      content: z.string().trim().min(1),
      status: postStatusSchema.optional(),
      categoryIds: z.array(z.coerce.number().int().positive()).optional(),
      tagIds: z.array(z.coerce.number().int().positive()).optional(),
    })
    .strict(),
};

const getPostsSchema = {
  query: pageLimitQuerySchema.extend({
    category: z.string().trim().optional(),
    tag: z.string().trim().optional(),
    status: postStatusSchema.optional(),
    title: z.string().trim().optional(),
    search: z.string().trim().optional(),
  }),
};

const getPostSchema = {
  params: idOrSlugParamSchema,
};

const updatePostSchema = {
  params: idOrSlugParamSchema,
  body: z
    .object({
      title: z.string().trim().min(1).max(200).optional(),
      excerpt: z.string().trim().max(2000).optional(),
      content: z.string().trim().min(1).optional(),
      status: postStatusSchema.optional(),
      categoryIds: z.array(z.coerce.number().int().positive()).optional(),
      tagIds: z.array(z.coerce.number().int().positive()).optional(),
    })
    .strict(),
};

const publishPostSchema = {
  params: idOrSlugParamSchema,
};

const deletePostSchema = {
  params: idOrSlugParamSchema,
};

module.exports = {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  publishPostSchema,
  updatePostSchema,
};
