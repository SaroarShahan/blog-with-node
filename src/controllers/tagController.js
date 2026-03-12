const { Op } = require('sequelize');

const asyncHandler = require('../utils/asyncHandler');
const { CategoryModel } = require('../models');
const urlSlugify = require('../utils');

exports.createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let slug = urlSlugify(name);

  const existingSlug = await CategoryModel.findOne({ where: { slug } });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  const existingTag = await CategoryModel.findOne({ where: { name } });

  if (existingTag) {
    return res.status(400).json({
      success: false,
      message: 'Tag with the same name already exists',
    });
  }

  const tag = await CategoryModel.create({ name, slug });

  return res.status(201).json({
    success: true,
    message: 'Tag has been created successfully',
    data: tag,
  });
});
