const bcrypt = require('bcrypt');

const asyncHandler = require('../utils/asyncHandler');
const { getOffset } = require('../constants');
const { UserModel, PostModel, ProfileModel } = require('../models');
const { buildUserWhereClause } = require('../utils/buildUserWhereClause');

exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password, gender, role } = req.body;

  const existingUser = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const existingUsername = await UserModel.findOne({
    where: {
      username,
    },
  });

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

exports.getAllUsers = async (req, res) => {
  try {
    const whereClause = buildUserWhereClause(req.query);
    const { page, limit } = req.query;

    const querySpec = {
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']],
      offset: getOffset(page, limit),
      limit: page && limit ? parseInt(limit) : undefined,
    };

    const { count, rows: users } = await UserModel.findAndCountAll({
      ...querySpec,
      include: [
        {
          model: ProfileModel,
          as: 'profile',
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
      total: count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: ProfileModel,
        as: 'profile',
      },
    ],
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

exports.getUserPosts = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, gender, role, status } = req.body;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }
    await user.update({
      username: username ?? user.username,
      gender: gender ?? user.gender,
      role: role ?? user.role,
      success: status ?? user.status,
    });

    return res.status(200).json({
      success: true,
      message: 'User has been updated successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, bio, avatarUrl, website, location, dateOfBirth } = req.body;

  let profile = await ProfileModel.findOne({
    where: { userId: id },
  });

  if (!profile) {
    return res.status(401).json({
      success: false,
      message: 'Profile not found for the user!',
    });
  }

  await profile.update({
    fullName: fullName ?? profile.fullName,
    firstName: firstName ?? profile.firstName,
    lastName: lastName ?? profile.lastName,
    bio: bio ?? profile.bio,
    avatarUrl: avatarUrl ?? profile.avatarUrl,
    website: website ?? profile.website,
    location: location ?? profile.location,
    dateOfBirth: dateOfBirth ?? profile.dateOfBirth,
  });

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  });
});

exports.deleteUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
