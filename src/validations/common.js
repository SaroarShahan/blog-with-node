const { z } = require('zod');

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const userIdParamSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

const postIdParamSchema = z.object({
  postId: z.coerce.number().int().positive(),
});

const idOrSlugParamSchema = z.object({
  idOrSlug: z.string().trim().min(1),
});

const pageLimitQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
  })
  .loose();

const emailSchema = z.string().trim().pipe(z.email());

module.exports = {
  emailSchema,
  idParamSchema,
  idOrSlugParamSchema,
  pageLimitQuerySchema,
  postIdParamSchema,
  userIdParamSchema,
};