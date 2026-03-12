const { Op } = require('sequelize');

const asyncHandler = require('../utils/asyncHandler');
const { CategoryModel } = require('../models');
const urlSlugify = require('../utils');

exports.createCategory = asyncHandler(async (req, res) => {
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

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.findAll({
    order: [['id', 'DESC']],
  });

  return res.json({
    success: true,
    message: 'fetched successfully',
    data: categories,
  });
});

exports.getCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const category = await CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  return res.json({
    success: true,
    message: 'Category has been retrieved successfully',
    data: category,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { name, description } = req.body;

  const category = await CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

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

  return res.json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const category = await CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  await category.destroy();

  return res.json({
    success: true,
    message: 'Category has been deleted successfully',
  });
});
