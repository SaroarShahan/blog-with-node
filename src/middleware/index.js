const { authenticateToken } = require('./auth');
const { isAdmin } = require('./isAdmin');
const { errorHandler } = require('./errorHandler');
const validate = require('./validate');

module.exports = {
  authenticateToken,
  isAdmin,
  validate,
  errorHandler,
};
