const { UserModel } = require("../models");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserModel.findByPk(userId, { attributes: ['id', 'firstName', 'lastName', 'email', 'gender', 'role'] });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        }

        res.json({
            status: true,
            message: 'Profile fetched successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, password, gender, role } = req.body;

        const user = await UserModel.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = user.email;
        user.password = password || user.password;
        user.gender = gender || user.gender;
        user.role = user.role;

        await user.save();

        return res.status(200).json({
            status: true,
            message: 'Profile has been updated successfully!',
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                gender: user.gender
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};