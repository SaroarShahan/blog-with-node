const { Op } = require('sequelize');

const { AUTHORIZATION_POLICIES, getOffset } = require('../constants');
const { PostModel, UserModel, CategoryModel, TagModel, CommentModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { canEdit, canDelete } = require('../utils/authorization');
const { buildPostWhereClause } = require('../utils/buildPostWhereClause');
const urlSlugify = require('../utils');

const findPostByIdOrSlug = async (idOrSlug) => {
  return PostModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
    },
  });
};

const createPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, status, categoryIds = [], tagIds = [] } = req.body;
  const userId = req.user.id;
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

const getAllPosts = asyncHandler(async (req, res) => {
  const query = req.query;
  const { page, limit, category, tag } = query;
  const whereClause = buildPostWhereClause(query);
  const userId = req.user?.id;
  const andConditions = [];

  if (whereClause[Op.or]) {
    andConditions.push({ [Op.or]: whereClause[Op.or] });
    delete whereClause[Op.or];
  }

  if (!query.status) {
    andConditions.push({
      [Op.or]: [{ status: 'published' }, ...(userId ? [{ status: 'draft', userId }] : [])],
    });
  } else if (query.status !== 'published') {
    andConditions.push({ userId: userId ?? null });
  }

  if (andConditions.length) {
    whereClause[Op.and] = andConditions;
  }

  const { rows, count } = await PostModel.findAndCountAll({
    distinct: true,
    where: whereClause,
    include: [
      {
        model: UserModel,
        as: 'author',
        where: { status: 'active' },
        attributes: ['id', 'username', 'email'],
        required: true,
      },
      {
        model: CategoryModel,
        as: 'categories',
        where: category ? { name: category } : undefined,
        through: { attributes: [] },
        required: !!category,
      },
      {
        model: TagModel,
        as: 'tags',
        where: tag ? { name: tag } : undefined,
        through: { attributes: [] },
        required: !!tag,
      },
    ],
    limit: limit ? parseInt(limit) : undefined,
    offset: getOffset(page, limit),
    order: [['id', 'DESC']],
  });

  return res.status(200).json({
    success: true,
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

const getPost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const userId = req.user?.id;
  const post = await PostModel.findOne({
    where: {
      [Op.or]: [{ slug: idOrSlug }, { id: idOrSlug }],
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
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  if (post.status !== 'published' && userId !== post.userId) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  if (userId !== post.userId) {
    await post.increment('viewCount');
  }

  return res.status(200).json({
    success: true,
    message: 'Post fetched successfully',
    data: post,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const user = req.user;
  const payload = req.body;
  const post = await findPostByIdOrSlug(idOrSlug);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  const canEditResult = canEdit(user, post.userId, AUTHORIZATION_POLICIES.OWNER_ONLY);

  if (!canEditResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to edit this post',
    });
  }

  let newSlug = post.slug;
  const { title, excerpt, content, status, categoryIds, tagIds } = payload;

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

  return res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: updatedPost,
  });
});

const publishPost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const user = req.user;
  const post = await findPostByIdOrSlug(idOrSlug);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  const canEditResult = canEdit(user, post.userId, AUTHORIZATION_POLICIES.OWNER_ONLY);

  if (!canEditResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to publish this post',
    });
  }

  if (post.status !== 'published') {
    await post.update({
      status: 'published',
      publishedAt: post.publishedAt || new Date(),
    });
  }

  const publishedPost = await PostModel.findByPk(post.id, {
    include: [
      { model: UserModel, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: CategoryModel, as: 'categories', through: { attributes: [] } },
      { model: TagModel, as: 'tags', through: { attributes: [] } },
    ],
  });

  return res.status(200).json({
    success: true,
    message: 'Post has been published successfully',
    data: publishedPost,
  });
});

const draftPost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const user = req.user;
  const post = await findPostByIdOrSlug(idOrSlug);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  const canEditResult = canEdit(user, post.userId, AUTHORIZATION_POLICIES.OWNER_ONLY);

  if (!canEditResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to draft this post',
    });
  }

  if (post.status !== 'draft') {
    await post.update({
      status: 'draft',
    });
  }

  const draftedPost = await PostModel.findByPk(post.id, {
    include: [
      { model: UserModel, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: CategoryModel, as: 'categories', through: { attributes: [] } },
      { model: TagModel, as: 'tags', through: { attributes: [] } },
    ],
  });

  return res.status(200).json({
    success: true,
    message: 'Post has been moved to draft successfully',
    data: draftedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const user = req.user;
  const post = await findPostByIdOrSlug(idOrSlug);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found!',
    });
  }

  const canDeleteResult = canDelete(user, post.userId, AUTHORIZATION_POLICIES.OWNER_OR_ADMIN);

  if (!canDeleteResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this post',
    });
  }

  await post.destroy();

  return res.status(200).json({
    success: true,
    message: 'Post has been deleted successfully!',
  });
});

const getPostsByCategory = asyncHandler(async (req, res) => {
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

  return res.status(200).json({
    success: true,
    data: category.posts,
  });
});

const getCategoryWithPosts = asyncHandler(async (req, res) => {
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

  return res.status(200).json({
    success: true,
    data: category,
  });
});

module.exports = {
  createPost,
  deletePost,
  draftPost,
  getAllPosts,
  getCategoryWithPosts,
  getPost,
  getPostsByCategory,
  publishPost,
  updatePost,
};
