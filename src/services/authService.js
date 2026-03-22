const bcrypt = require('bcrypt');

const { RoleModel, UserModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/jwt');

const register = asyncHandler(async (req, res) => {
  const { username, email, password, gender, roleId } = req.body;
  const existingUser = await UserModel.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists!',
    });
  }

  const existingRole = roleId
    ? await RoleModel.findByPk(roleId)
    : await RoleModel.findOne({ where: { id: 1 } });

  if (!existingRole) {
    return res.status(400).json({
      success: false,
      message: 'Role not found!',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await UserModel.create({
    username,
    email,
    roleId: existingRole.id,
    gender,
    password: hashedPassword,
  });

  const userWithoutPassword = await UserModel.findByPk(newUser.id, {
    attributes: { exclude: ['password'] },
    include: [{ model: RoleModel, as: 'role', attributes: ['id', 'name'] }],
  });

  return res.status(201).json({
    success: true,
    message: 'Registration has been completed successfully!',
    data: userWithoutPassword,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: { email },
    include: [{ model: RoleModel, as: 'role', attributes: ['id', 'name'] }],
  });

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
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful!',
    data: {
      id: user.id,
      roleId: user.roleId,
      role: user.role?.name ?? null,
    },
    token,
  });
});

module.exports = {
  login,
  register,
};
