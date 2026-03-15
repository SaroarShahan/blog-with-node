require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelizeLogging = process.env.DB_LOGGING === 'true' ? console.log : false;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: sequelizeLogging,
});

module.exports = sequelize;
