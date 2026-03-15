const { AUTHORIZATION_POLICIES } = require('../constants');
const { CommentModel, UserModel, PostModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { canEdit, canDelete } = require('../utils/authorization');

const getCommentById = async (id) => CommentModel.findByPk(id);

const getPostOwnerIdByComment = async (comment) => {
  const post = await PostModel.findByPk(comment.postId, {
    attributes: ['id', 'userId'],
  });

  return post?.userId || null;
};

const createComment = asyncHandler(async (req, res) => {
  const { postId, parentCommentId, content } = req.body;
  const userId = req.user.id;
  const comment = await CommentModel.create({
    postId,
    userId,
    parentCommentId: parentCommentId || null,
    content,
  });

  const createdComment = await CommentModel.findByPk(comment.id, {
    include: [{ model: UserModel, as: 'author', attributes: ['id', 'username'] }],
  });

  return res.status(201).json({
    success: true,
    message: 'Comment has been created successfully',
    data: createdComment,
  });
});

const getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await CommentModel.findAll({
    where: { post_id: postId, parentCommentId: null },
    include: [
      {
        model: UserModel,
        as: 'author',
        attributes: ['id', 'username'],
        where: { status: 'active' },
        required: true,
      },
      {
        model: CommentModel,
        as: 'replies',
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'username'],
            where: { status: 'active' },
            required: true,
          },
        ],
        required: false,
      },
    ],
    order: [['id', 'DESC']],
  });

  return res.status(200).json({
    success: true,
    message: 'Comments fetched successfully',
    data: comments,
  });
});

const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const payload = req.body;
  const comment = await getCommentById(id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found',
    });
  }

  const canEditResult = canEdit(user, comment.userId, AUTHORIZATION_POLICIES.OWNER_ONLY);

  if (!canEditResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to update this comment',
    });
  }

  await comment.update({
    content: payload.content ?? comment.content,
    status: payload.status ?? comment.status,
  });

  return res.status(200).json({
    success: true,
    message: 'Comment has been updated successfully',
    data: comment,
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const comment = await getCommentById(id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found',
    });
  }

  const postOwnerId = await getPostOwnerIdByComment(comment);
  const canDeleteResult = canDelete(
    user,
    [comment.userId, postOwnerId].filter(Boolean),
    AUTHORIZATION_POLICIES.OWNER_OR_ADMIN,
  );

  if (!canDeleteResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this comment',
    });
  }

  await comment.destroy();

  return res.status(200).json({
    success: true,
    message: 'Comment has been deleted successfully',
  });
});

module.exports = {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
};
