const { Op } = require('sequelize');
const { getOffset } = require('../constants');
const { utils } = require('../constants/utils');
const { UserModel } = require('../models');
const { buildUserWhereClause } = require('../utils/buildUserWhereClause');

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, role } = req.body;

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password,
            gender,
            role
        });

        return res.status(201).json({
            status: true,
            message: 'User has been created successfully!',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const whereClause = buildUserWhereClause(req.query);
        const { page, limit } = req.query;

        const querySpec = {
            where: whereClause,
            attributes: { exclude: ['password'] },
            offset: getOffset(page, limit),
            limit: page && limit ? parseInt(limit) : undefined
        }

        const { count, rows: users } = await UserModel.findAndCountAll({ ...querySpec });

        return res.status(200).json({
            status: true,
            message: 'Users fetched successfully!',
            data: users,
            total: count
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'User fetched successfully!',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password, gender, role } = req.body;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.password = password || user.password;
        user.gender = gender || user.gender;
        user.role = role || user.role;

        await user.save();

        return res.status(200).json({
            status: true,
            message: 'User has been updated successfully!',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        }

        await user.destroy();

        return res.status(200).json({
            status: true,
            message: 'User has been deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};