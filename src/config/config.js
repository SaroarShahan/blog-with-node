require('dotenv').config();

const sequelizeLogging = process.env.DB_LOGGING === 'true' ? console.log : false;
const sharedConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: sequelizeLogging,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

module.exports = {
  development: sharedConfig,
  production: sharedConfig,
};
