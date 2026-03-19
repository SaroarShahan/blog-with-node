const AppError = require('./appError');

const sendErrorDev = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || false;
  const message = error.message;
  const stack = error.stack;
  const errors = error.issues?.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  res.status(statusCode).json({
    status,
    message,
    ...(errors ? { errors } : {}),
    stack,
  });
};

const sendErrorProd = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || false;
  const message = error.message || "It's not you, it's us!";
  const stack = error.stack;
  const errors = error.issues?.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  if (error.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
      ...(errors ? { errors } : {}),
    });
  }

  console.log(error.name, error.message, stack);
  return res.status(500).json({
    status: 'error',
    message,
  });
};

const globalErrorHandler = (err, _, res, _next) => {
  if (err.name === 'JWSSignatureVerificationFailed') {
    err = new AppError('Invalid or expired token', 401);
  }

  if (err.name === 'ZodError') {
    err.statusCode = 400;
    err.isOperational = true;
    err.message = 'Validation failed';
  }

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  return sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
