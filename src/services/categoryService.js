const { Op } = require('sequelize');

const { CategoryModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const urlSlugify = require('../utils');

const findCategoryByIdOrSlug = async (idOrSlug) => {
  return CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });
};

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  let slug = urlSlugify(name);

  const existingSlug = await CategoryModel.findOne({ where: { slug } });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  const existingCategory = await CategoryModel.findOne({ where: { name } });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: 'Category with the same name already exists',
    });
  }

  const category = await CategoryModel.create({ name, slug, description });

  return res.status(201).json({
    success: true,
    message: 'Category has been created successfully',
    data: category,
  });
});

const getAllCategories = asyncHandler(async (_req, res) => {
  const categories = await CategoryModel.findAll({ order: [['id', 'DESC']] });

  return res.status(200).json({
    success: true,
    message: 'fetched successfully',
    data: categories,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const category = await findCategoryByIdOrSlug(idOrSlug);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Category has been retrieved successfully',
    data: category,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { name, description } = req.body;
  const category = await findCategoryByIdOrSlug(idOrSlug);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  let newSlug = category.slug;

  if (name && name !== category.name) {
    newSlug = urlSlugify(name);

    const existingSlug = await CategoryModel.findOne({
      where: { slug: newSlug, id: { [Op.ne]: category.id } },
    });

    if (existingSlug) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
  }

  await category.update({
    name: name ?? category.name,
    description: description ?? category.description,
    slug: newSlug,
  });

  return res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const category = await findCategoryByIdOrSlug(idOrSlug);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  await category.destroy();

  return res.status(200).json({
    success: true,
    message: 'Category has been deleted successfully',
  });
});

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
};
