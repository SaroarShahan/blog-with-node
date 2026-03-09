require('dotenv').config();
const { createApp } = require('./app');
const sequelize = require('./config/database');

async function bootstrap() {
  await sequelize.authenticate();
  console.log('✅ DB connected');

  const app = createApp();
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start:', err);
  process.exit(1);
});