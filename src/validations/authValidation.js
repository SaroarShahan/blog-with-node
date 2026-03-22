const { z } = require('zod');

const { emailSchema } = require('./common');

const registerSchema = {
  body: z
    .object({
      username: z.string().trim().min(3).max(50),
      email: emailSchema,
      password: z.string().min(8).max(255),
      gender: z.enum(['male', 'female', 'other']),
      roleId: z.coerce.number().int().positive().optional(),
    })
    .strict(),
};

const loginSchema = {
  body: z
    .object({
      email: emailSchema,
      password: z.string().min(1),
    })
    .strict(),
};

module.exports = {
  loginSchema,
  registerSchema,
};
