const AppError = require('../errors/appError');

const hasPermission = (requiredPermission) => {
  return (req, _res, next) => {
    try {
      if (!req.user) {
        return next(new AppError('Not authorized to access this route', 401));
      }

      // Business owners have all permissions
      if (req.user.role === 'super_admin') {
        return next();
      }

      // Check if user has a role
      if (!req.user.role) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }

      const hasRequiredPermission = req.user.permissions.some(
        (permission) => permission === requiredPermission,
      );

      if (!hasRequiredPermission) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }

      return next();
    } catch {
      return next(new AppError('Error checking permissions', 500));
    }
  };
};

module.exports = {
  hasPermission,
};
