const { verifyToken } = require('../utils/jwt');
const { PermissionModel, RoleModel, UserModel } = require('../models');

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required',
      });
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
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
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
    next();
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
