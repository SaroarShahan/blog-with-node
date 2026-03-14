const { USER_ROLES } = require('../constants');

exports.isAdmin = (req, res, next) => {
  if (req.user?.role === USER_ROLES.ADMIN) {
    return next();
  }

  const error = new Error('Access denied. Admins only.');
  error.statusCode = 403;
  error.success = false;
  return next(error);
};
