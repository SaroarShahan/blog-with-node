const { Op } = require('sequelize');

const { TagModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const urlSlugify = require('../utils');

const findTagByIdOrSlug = async (idOrSlug) => {
  return TagModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });
};

const createTag = asyncHandler(async (req, res) => {
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

const getAllTags = asyncHandler(async (_req, res) => {
  const tags = await TagModel.findAll({ order: [['id', 'DESC']] });

  return res.status(200).json({
    success: true,
    message: 'Tags fetched successfully',
    data: tags,
  });
});

const getTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const tag = await findTagByIdOrSlug(idOrSlug);

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

const updateTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { name } = req.body;
  const tag = await findTagByIdOrSlug(idOrSlug);

  if (!tag) {
    return res.status(404).json({
      success: false,
      message: 'Tag not found',
    });
  }

  let newSlug = tag.slug;

  if (name && name !== tag.name) {
    newSlug = urlSlugify(name);

    const existingSlug = await TagModel.findOne({
      where: {
        slug: newSlug,
        id: { [Op.ne]: tag.id },
      },
    });

    if (existingSlug) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
  }

  await tag.update({
    name: name ?? tag.name,
    slug: newSlug,
  });

  return res.status(200).json({
    success: true,
    message: 'Tag has been updated successfully',
    data: tag,
  });
});

const deleteTag = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const tag = await findTagByIdOrSlug(idOrSlug);

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

module.exports = {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
};
