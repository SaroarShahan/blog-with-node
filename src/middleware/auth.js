const { verifyToken } = require('../utils/jwt');
const { PermissionModel, RoleModel, UserModel } = require('../models');

const attachAuthenticatedUser = async (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return false;
  }

  const payload = await verifyToken(token);
  const user = await UserModel.findByPk(payload.id, {
    attributes: ['id', 'username', 'email', 'status', 'roleId'],
    include: [
      {
        model: RoleModel,
        as: 'role',
        attributes: ['id', 'name'],
        include: [
          {
            model: PermissionModel,
            as: 'permissions',
            attributes: ['id', 'name', 'label', 'module'],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!user) {
    return null;
  }

  const permissions = user.role?.permissions ?? [];

  req.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    status: user.status,
    roleId: user.roleId,
    role: user.role?.name ?? null,
    permissions: permissions.map((permission) => permission.name),
  };

  return true;
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: req.headers['authorization'] ? 'Invalid access token' : 'Access token required',
      });
    }

    return next();
  } catch (error) {
    if (
      error.name === 'JWSSignatureVerificationFailed' ||
      error.name === 'JWTExpired' ||
      error.name === 'JWTClaimValidationFailed'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    next(error);
  }
};

exports.optionalAuthenticateToken = async (req, res, next) => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (isAuthenticated === null) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    }

    return next();
  } catch (error) {
    if (
      error.name === 'JWSSignatureVerificationFailed' ||
      error.name === 'JWTExpired' ||
      error.name === 'JWTClaimValidationFailed'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    return next(error);
  }
};
