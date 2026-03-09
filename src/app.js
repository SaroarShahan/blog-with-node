const express = require('express');

const userRoutes = require('./routes/userRoutes');

function createApp() {
  const app = express();

  app.use(express.json());

  // Routes
  app.use('/api/v1/users', userRoutes);

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