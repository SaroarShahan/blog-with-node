const { randomUUID } = require('crypto');

const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const requestId = req.get('x-request-id') || randomUUID();
  const startedAt = process.hrtime.bigint();

  req.requestId = requestId;
  req.log = logger.child({ requestId });
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const endedAt = process.hrtime.bigint();
    const latencyMs = Number(endedAt - startedAt) / 1e6;

    req.log.info(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        latencyMs: Number(latencyMs.toFixed(2)),
        userId: req.user?.id || null,
      },
      'request completed',
    );
  });

  next();
};

module.exports = {
  requestLogger,
};
