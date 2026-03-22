const { z } = require('zod');

const { emailSchema, idParamSchema, pageLimitQuerySchema, userIdParamSchema } = require('./common');

const createUserSchema = {
  body: z
    .object({
      firstName: z.string().trim().min(1).max(100),
      lastName: z.string().trim().min(1).max(100),
      username: z.string().trim().min(3).max(50),
      email: emailSchema,
      password: z.string().min(8).max(255),
      gender: z.enum(['male', 'female', 'other']),
      roleId: z.coerce.number().int().positive().optional(),
    })
    .strict(),
};

const getUsersSchema = {
  query: pageLimitQuerySchema.extend({
    email: z.string().trim().optional(),
    username: z.string().trim().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    roleId: z.coerce.number().int().positive().optional(),
  }),
};

const getUserSchema = {
  params: idParamSchema,
};

const getUserPostsSchema = {
  params: userIdParamSchema,
};

const updateUserSchema = {
  params: idParamSchema,
  body: z
    .object({
      username: z.string().trim().min(3).max(50).optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      roleId: z.coerce.number().int().positive().optional(),
      status: z.enum(['active', 'inactive', 'blocked']).optional(),
      firstName: z.string().trim().min(1).max(100).optional(),
      lastName: z.string().trim().min(1).max(100).optional(),
      bio: z.string().trim().max(1000).optional(),
      avatarUrl: z.string().trim().max(255).pipe(z.url()).optional(),
      website: z.string().trim().max(255).pipe(z.url()).optional(),
      location: z.string().trim().max(100).optional(),
      dateOfBirth: z.coerce.date().optional(),
    })
    .strict(),
};

const deleteUserSchema = {
  params: idParamSchema,
};

module.exports = {
  createUserSchema,
  deleteUserSchema,
  getUserPostsSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
};
