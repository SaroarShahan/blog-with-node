const { z } = require('zod');

const { idParamSchema } = require('./common');

const permissionIdsSchema = z.array(z.coerce.number().int().positive()).min(1);

const createRoleSchema = {
  body: z
    .object({
      name: z.string().trim().min(1).max(50),
      permissions: permissionIdsSchema,
    })
    .strict(),
};

const getRoleSchema = {
  params: idParamSchema,
};

const updateRoleSchema = {
  params: idParamSchema,
  body: z
    .object({
      name: z.string().trim().min(1).max(50),
      permissions: permissionIdsSchema.optional(),
    })
    .strict(),
};

const deleteRoleSchema = {
  params: idParamSchema,
};

module.exports = {
  createRoleSchema,
  deleteRoleSchema,
  getRoleSchema,
  updateRoleSchema,
};
