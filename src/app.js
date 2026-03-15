const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const { errorHandler, requestLogger } = require('./middleware');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoutes = require('./routes/commentRoutes');

function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (!allowedOrigins.length) {
        return callback(null, process.env.NODE_ENV !== 'production');
      }

      return callback(null, allowedOrigins.includes(origin));
    },
    credentials: true,
  };

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(compression());

  app.use(express.json());
  app.use(requestLogger);

  // Routes
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/tags', tagRoutes);
  app.use('/api/v1/comments', commentRoutes);

  app.get('/health', (req, res) => {
    res.json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    });
  });
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
