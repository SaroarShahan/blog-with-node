const { z } = require('zod');

const permissionModuleSchema = z.string().trim().min(1).max(100);

const getPermissionsSchema = {
  query: z
    .object({
      module: permissionModuleSchema.optional(),
    })
    .strict()
    .partial(),
};

module.exports = {
  getPermissionsSchema,
};
