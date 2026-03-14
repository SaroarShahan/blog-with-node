const asyncHandler = require('../utils/asyncHandler');
const { CommentModel, UserModel, PostModel } = require('../models');
const { canEdit, canDelete } = require('../utils/authorization');

exports.createComment = asyncHandler(async (req, res) => {
  const { postId, parentCommentId, content } = req.body;
  const userId = req.user.id;

  const comment = await CommentModel.create({
    postId,
    userId,
    parentCommentId: parentCommentId || null,
    content,
  });

  const createdComment = await CommentModel.findByPk(comment.id, {
    include: [
      {
        model: UserModel,
        as: 'author',
        attributes: ['id', 'username'],
      },
    ],
  });

  return res.status(201).json({
    success: true,
    message: 'Comment has been created successfully',
    data: createdComment,
  });
});

exports.getCommentsByPost = asyncHandler(async (req, res) => {
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

  return res.json({
    success: true,
    message: 'Comments fetched successfully',
    data: comments,
  });
});

exports.updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, status } = req.body;
  const comment = await CommentModel.findByPk(id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found',
    });
  }

  const canEditResult = canEdit(req.user, comment.userId);

  if (!canEditResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to update this comment',
    });
  }

  await comment.update({
    content: content ?? comment.content,
    status: status ?? comment.status,
  });

  return res.json({
    success: true,
    message: 'Comment has been updated successfully',
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await CommentModel.findByPk(id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found',
    });
  }

  const post = await PostModel.findByPk(comment.postId, {
    attributes: ['id', 'userId'],
  });

  const canDeleteResult = canDelete(req.user, [comment.userId, post?.userId].filter(Boolean));

  if (!canDeleteResult) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this comment',
    });
  }

  await comment.destroy();

  return res.json({
    success: true,
    message: 'Comment has been deleted successfully',
  });
});
