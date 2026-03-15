const bcrypt = require('bcrypt');

const { getOffset } = require('../constants');
const { UserModel, PostModel, ProfileModel } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { buildUserWhereClause } = require('../utils/buildUserWhereClause');

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, gender, role } = req.body;
  const existingUser = await UserModel.findOne({ where: { email } });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const existingUsername = await UserModel.findOne({ where: { username } });

  if (existingUsername) {
    return res.status(409).json({
      success: false,
      message: 'Username already exists',
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await UserModel.create({
    username,
    email,
    password: passwordHash,
    gender,
    role,
  });

  const userWithoutPassword = await UserModel.findByPk(newUser.id, {
    attributes: { exclude: ['password'] },
  });

  return res.status(201).json({
    success: true,
    message: 'User has been created successfully!',
    data: userWithoutPassword,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query;
  const whereClause = buildUserWhereClause(query);
  const { page, limit } = query;

  const { count, rows: users } = await UserModel.findAndCountAll({
    where: whereClause,
    attributes: { exclude: ['password'] },
    order: [['id', 'DESC']],
    offset: getOffset(page, limit),
    limit: page && limit ? parseInt(limit) : undefined,
    include: [{ model: ProfileModel, as: 'profile' }],
  });

  return res.status(200).json({
    success: true,
    message: 'Users fetched successfully!',
    data: users,
    total: count,
  });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{ model: ProfileModel, as: 'profile' }],
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User fetched successfully!',
    data: user,
  });
});

const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId is required as a path parameter',
    });
  }

  const user = await UserModel.findByPk(userId, {
    include: [
      {
        model: PostModel,
        as: 'posts',
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }

  const posts = user.posts || [];

  return res.status(200).json({
    success: true,
    message: 'User posts fetched successfully!',
    data: posts,
    total: posts.length,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const user = await UserModel.findByPk(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }

  await user.update({
    username: payload.username ?? user.username,
    gender: payload.gender ?? user.gender,
    role: payload.role ?? user.role,
    status: payload.status ?? user.status,
  });

  return res.status(200).json({
    success: true,
    message: 'User has been updated successfully!',
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const profile = await ProfileModel.findOne({ where: { userId: id } });

  if (!profile) {
    return res.status(401).json({
      success: false,
      message: 'Profile not found for the user!',
    });
  }

  await profile.update({
    firstName: payload.firstName ?? profile.firstName,
    lastName: payload.lastName ?? profile.lastName,
    bio: payload.bio ?? profile.bio,
    avatarUrl: payload.avatarUrl ?? profile.avatarUrl,
    website: payload.website ?? profile.website,
    location: payload.location ?? profile.location,
    dateOfBirth: payload.dateOfBirth ?? profile.dateOfBirth,
  });

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }

  await user.destroy();

  return res.status(200).json({
    success: true,
    message: 'User has been deleted successfully!',
  });
});

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserPosts,
  updateProfile,
  updateUser,
};
