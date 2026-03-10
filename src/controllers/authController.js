const bcrypt = require('bcrypt');

const { UserModel } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, role } = req.body;

        const existingUser = await UserModel.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User with this email already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            role
        });

        const userWithoutPassword = await UserModel.findByPk(newUser.id, {
            attributes: { exclude: ['password'] }
        });

        res.status(201).json({
            status: true,
            message: 'Registration has been completed successfully!',
            data: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials!'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials!'
            });
        }

        const token = await generateToken({
            id: user.id,
            email: user.email
        });

        res.status(200).json({
            status: true,
            message: 'Login successful!',
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};