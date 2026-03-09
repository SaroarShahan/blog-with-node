const express = require('express');

function createApp() {
  const app = express();

  app.use(express.json());

  // Routes
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