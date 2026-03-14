const { z } = require('zod');

const { idParamSchema, postIdParamSchema } = require('./common');

const commentStatusSchema = z.enum(['pending', 'approved', 'rejected']);

const createCommentSchema = {
  body: z
    .object({
      postId: z.coerce.number().int().positive(),
      parentCommentId: z.coerce.number().int().positive().optional(),
      content: z.string().trim().min(1),
    })
    .strict(),
};

const getCommentsByPostSchema = {
  params: postIdParamSchema,
};

const updateCommentSchema = {
  params: idParamSchema,
  body: z
    .object({
      content: z.string().trim().min(1).optional(),
      status: commentStatusSchema.optional(),
    })
    .strict(),
};

const deleteCommentSchema = {
  params: idParamSchema,
};

module.exports = {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsByPostSchema,
  updateCommentSchema,
};