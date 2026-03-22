const { authenticateToken } = require('./auth');
const { loginRateLimiter, registerRateLimiter } = require('./authRateLimit');
const { authorize } = require('./authorize');
const { requestLogger } = require('./requestLogger');
const validate = require('./validate');

module.exports = {
  authenticateToken,
  authorize,
  loginRateLimiter,
  registerRateLimiter,
  requestLogger,
  validate,
};
