const { Op } = require('sequelize');

const { PostModel, UserModel, CategoryModel, TagModel, CommentModel } = require('../models');
const { buildPostWhereClause } = require('../utils/buildPostWhereClause');
const { getOffset } = require('../constants');
const asyncHandler = require('../utils/asyncHandler');
const urlSlugify = require('../utils');

exports.createPost = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, excerpt, content, status, categoryIds = [], tagIds = [] } = req.body;

  let slug = urlSlugify(title);

  const existingPost = await PostModel.findOne({ where: { slug } });

  if (existingPost) {
    slug = `${slug}-${Date.now()}`;
  }

  const post = await PostModel.create({
    userId,
    title,
    slug,
    excerpt,
    content,
    status: status ?? 'draft',
    publishedAt: status === 'published' ? new Date() : null,
  });

  if (categoryIds.length) {
    await post.setCategories(categoryIds);
  }

  if (tagIds.length) {
    await post.setTags(tagIds);
  }

  const createdPost = await PostModel.findByPk(post.id, {
    include: [
      { model: UserModel, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: CategoryModel, as: 'categories' },
      { model: TagModel, as: 'tags' },
    ],
  });

  return res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: createdPost,
  });
});

exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page, limit, category, tag, status = 'published' } = req.query;

  const whereClause = buildPostWhereClause(req.query);

  const querySpec = {
    where: {
      ...whereClause,
      status,
    },
    include: [
      {
        model: UserModel,
        as: 'author',
        attributes: ['id', 'username', 'email'],
      },
      {
        model: CategoryModel,
        as: 'categories',
        ...(category ? { where: { name: category } } : {}),
        through: { attributes: [] },
      },
      {
        model: TagModel,
        as: 'tags',
        ...(tag ? { where: { name: tag } } : {}),
        through: { attributes: [] },
      },
    ],
    limit: limit ? parseInt(limit) : undefined,
    offset: getOffset(page, limit),
    distinct: true,
    order: [['id', 'DESC']],
  };

  const { rows, count } = await PostModel.findAndCountAll({
    ...querySpec,
  });

  res.json({
    status: true,
    message: 'Posts fetched successfully',
    data: rows,
    meta: {
      total: count,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    },
  });
});

exports.getPost = asyncHandler(async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const userId = req.user?.id;

    const querySpec = {
      include: [
        {
          model: UserModel,
          as: 'author',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: CategoryModel,
          as: 'categories',
          through: { attributes: [] },
        },
        {
          model: TagModel,
          as: 'tags',
          through: { attributes: [] },
        },
        {
          model: CommentModel,
          as: 'comments',
          where: { parentCommentId: null },
          required: false,
          include: [
            {
              model: UserModel,
              as: 'author',
              attributes: ['id', 'username'],
            },
            {
              model: CommentModel,
              as: 'replies',
              include: [
                {
                  model: UserModel,
                  as: 'author',
                  attributes: ['id', 'username'],
                },
              ],
            },
          ],
        },
      ],
    };

    const post = await PostModel.findOne({
      where: {
        [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
      },
      ...querySpec,
    });

    if (!post) {
      return res.status(404).json({
        status: false,
        message: 'Post not found!',
      });
    }

    if (userId !== post.userId) {
      await post.increment('viewCount');
    }

    res.json({
      status: true,
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { title, excerpt, content, status, categoryIds, tagIds } = req.body;

  const post = await PostModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!post) {
    return res.status(404).json({
      status: false,
      message: 'Post not found!',
    });
  }

  let newSlug = post.slug;

  if (title && title !== post.title) {
    newSlug = urlSlugify(title);

    const existingSlug = await PostModel.findOne({
      where: {
        slug: newSlug,
        id: { [Op.ne]: post.id },
      },
    });

    if (existingSlug) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
  }

  await post.update({
    title: title ?? post.title,
    slug: newSlug,
    excerpt: excerpt ?? post.excerpt,
    content: content ?? post.content,
    status: status ?? post.status,
    publishedAt: status === 'published' ? post.publishedAt || new Date() : post.publishedAt,
  });

  if (Array.isArray(categoryIds)) {
    await post.setCategories(categoryIds);
  }

  if (Array.isArray(tagIds)) {
    await post.setTags(tagIds);
  }

  const updatedPost = await PostModel.findByPk(post.id, {
    include: [
      { model: UserModel, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: CategoryModel, as: 'categories', through: { attributes: [] } },
      { model: TagModel, as: 'tags', through: { attributes: [] } },
    ],
  });

  res.json({
    status: true,
    message: 'Post updated successfully',
    data: updatedPost,
  });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const post = await PostModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });

  if (!post) {
    return res.status(404).json({
      status: false,
      message: 'Post not found!',
    });
  }

  await post.destroy();

  res.json({
    status: true,
    message: 'Post has been deleted successfully!',
  });
});

exports.getPostsByCategory = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const category = await CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
    include: [
      {
        model: PostModel,
        as: 'posts',
        through: { attributes: [] },
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username'],
          },
        ],
      },
    ],
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  return res.json({
    success: true,
    data: category.posts,
  });
});

exports.getCategoryWithPosts = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const category = await CategoryModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
    include: [
      {
        model: PostModel,
        as: 'posts',
        through: { attributes: [] },
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username'],
          },
          {
            model: CommentModel,
            as: 'comments',
            attributes: ['id', 'content', 'createdAt'],
            where: { parentCommentId: null },
            required: false,
            include: [
              {
                model: UserModel,
                as: 'author',
                attributes: ['id', 'username'],
              },
              {
                model: CommentModel,
                as: 'replies',
                include: [
                  {
                    model: UserModel,
                    as: 'author',
                    attributes: ['id', 'username'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  return res.json({
    success: true,
    data: category,
  });
});
