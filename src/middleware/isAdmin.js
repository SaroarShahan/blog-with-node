exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  const error = new Error('Access denied. Admins only.');
  error.statusCode = 403;
  error.success = false;
  return next(error);
};
