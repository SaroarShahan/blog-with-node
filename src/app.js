const express = require('express');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');

function createApp() {
  const app = express();

  app.use(express.json());

  // Routes
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/profiles', profileRoutes);
  app.use('/api/v1/auth', authRoutes);

  app.get('/health', (req, res) => {
    res.json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    });
  });

  return app;
}

module.exports = { createApp };