const express = require('express');

const { errorHandler } = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');

function createApp() {
  const app = express();

  app.use(express.json());

  // Routes
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/tags', tagRoutes);

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
