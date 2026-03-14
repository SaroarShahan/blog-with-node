const { ZodError } = require('zod');

const validate = (schema = {}) => {
  return (req, res, next) => {
    try {
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }

      return next(error);
    }
  };
};

module.exports = validate;