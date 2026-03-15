require('dotenv').config();
const { createApp } = require('./app');
const sequelize = require('./config/database');
const logger = require('./utils/logger');

async function bootstrap() {
  await sequelize.authenticate();
  logger.info('DB connected');

  const app = createApp();
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    logger.info({ port: PORT }, 'Server started');
  });
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to start');
  process.exit(1);
});
