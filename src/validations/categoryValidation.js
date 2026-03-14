const { z } = require('zod');

const { idOrSlugParamSchema } = require('./common');

const createCategorySchema = {
  body: z
    .object({
      name: z.string().trim().min(1).max(100),
      description: z.string().trim().max(2000).optional(),
    })
    .strict(),
};

const getCategorySchema = {
  params: idOrSlugParamSchema,
};

const updateCategorySchema = {
  params: idOrSlugParamSchema,
  body: z
    .object({
      name: z.string().trim().min(1).max(100).optional(),
      description: z.string().trim().max(2000).optional(),
    })
    .strict(),
};

const deleteCategorySchema = {
  params: idOrSlugParamSchema,
};

module.exports = {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
};