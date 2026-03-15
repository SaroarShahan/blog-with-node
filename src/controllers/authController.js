const bcrypt = require('bcrypt');

const { UserModel } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, gender } = req.body;

    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      username,
      email,
      role,
      gender,
      password: hashedPassword,
    });

    const userWithoutPassword = await UserModel.findByPk(newUser.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(201).json({
      success: true,
      message: 'Registration has been completed successfully!',
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!',
      });
    }

    const token = await generateToken({
      id: user.id,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: user.id,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
