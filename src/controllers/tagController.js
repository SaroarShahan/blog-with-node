const { Op } = require('sequelize');

const asyncHandler = require('../utils/asyncHandler');
const { TagModel } = require('../models');
const urlSlugify = require('../utils');

exports.createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let slug = urlSlugify(name);

  const existingSlug = await TagModel.findOne({ where: { slug } });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  const existingTag = await TagModel.findOne({ where: { name } });

  if (existingTag) {
    return res.status(400).json({
      success: false,
      message: 'Tag with the same name already exists',
    });
  }

  const tag = await TagModel.create({ name, slug });

  return res.status(201).json({
    success: true,
    message: 'Tag has been created successfully',
    data: tag,
  });
});

exports.getAllTags = asyncHandler(async (req, res) => {
  const tags = await TagModel.findAll({
    order: [['id', 'DESC']],
  });

  return res.status(200).json({
    status: true,
    message: 'Tags fetched successfully',
    data: tags,
  });
});

exports.getTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const tag = await TagModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!tag) {
    return res.status(404).json({
      success: false,
      message: 'Tag not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Tag fetched successfully',
    data: tag,
  });
});

exports.updateTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { name } = req.body;

  const tag = await TagModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!tag) {
    return res.status(404).json({
      success: false,
      message: 'Tag not found',
    });
  }

  let existingSlug = tag.slug;

  if (name && name !== tag.name) {
    existingSlug = urlSlugify(name);
  }

  await tag.update({
    name: name ?? tag.name,
    slug: existingSlug,
  });

  return res.status(200).json({
    success: true,
    message: 'Tag has been updated successfully',
    data: tag,
  });
});

exports.deleteTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const tag = await TagModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!tag) {
    return res.status(404).json({
      success: false,
      message: 'Tag not found',
    });
  }

  await tag.destroy();

  return res.status(200).json({
    success: true,
    message: 'Tag has been deleted successfully',
  });
});
