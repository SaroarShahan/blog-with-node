const { z } = require('zod');

const { idOrSlugParamSchema } = require('./common');

const createTagSchema = {
  body: z
    .object({
      name: z.string().trim().min(1).max(100),
    })
    .strict(),
};

const getTagSchema = {
  params: idOrSlugParamSchema,
};

const updateTagSchema = {
  params: idOrSlugParamSchema,
  body: z
    .object({
      name: z.string().trim().min(1).max(100).optional(),
    })
    .strict(),
};

const deleteTagSchema = {
  params: idOrSlugParamSchema,
};

module.exports = {
  createTagSchema,
  deleteTagSchema,
  getTagSchema,
  updateTagSchema,
};