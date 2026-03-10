const { PostModel, UserModel } = require('../models');
const { buildPostWhereClause } = require('../utils/buildPostWhereClause');
const { getOffset } = require('../constants');

exports.createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, shortContent, content } = req.body;

        if (!title || shortContent === '' || content === '') {
            return res.status(400).json({
                status: false,
                message: 'Title, short content, content and user ID are required and cannot be empty'
            });
        }

        const newPost = await PostModel.create({
            title,
            shortContent,
            content,
            userId
        });

        res.status(201).json({
            status: true,
            message: 'Post has been created successfully!',
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const filters = {
            limit: limit ? parseInt(limit) : undefined,
            offset: getOffset(page, limit)
        }
        const whereClause = buildPostWhereClause(req.query);


        const querySpec = {
            where: whereClause,
            include: [
                {
                    model: UserModel,
                    as: 'author',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            ...filters,
        };

        const posts = await PostModel.findAndCountAll(querySpec);

        res.json({
            status: true,
            message: 'Posts fetched successfully',
            data: posts.rows,
            total: posts.count
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });

    }
};

exports.getPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await PostModel.findByPk(postId, {
            include: [
                {
                    model: UserModel,
                    as: 'author',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found!'
            });
        }

        res.json({
            status: true,
            message: 'Post fetched successfully',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, shortContent, content } = req.body;

    try {
        const post = await PostModel.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found!'
            });
        }

        await post.update({
            title,
            shortContent,
            content
        });

        res.json({
            status: true,
            message: 'Post updated successfully',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await PostModel.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found!'
            });
        }

        await post.destroy();

        res.json({
            status: true,
            message: 'Post has been deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};