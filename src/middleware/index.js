const { authenticateToken } = require('./auth');
const { isAdmin } = require('./isAdmin');
const { errorHandler } = require('./errorHandler');

module.exports = {
  authenticateToken,
  isAdmin,
  errorHandler,
};
