const { authenticateToken } = require('./auth');
const { loginRateLimiter, registerRateLimiter } = require('./authRateLimit');
const { isAdmin } = require('./isAdmin');
const { errorHandler } = require('./errorHandler');
const { requestLogger } = require('./requestLogger');
const validate = require('./validate');

module.exports = {
  authenticateToken,
  loginRateLimiter,
  registerRateLimiter,
  isAdmin,
  requestLogger,
  validate,
  errorHandler,
};
