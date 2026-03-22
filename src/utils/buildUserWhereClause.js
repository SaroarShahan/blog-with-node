const { Op } = require('sequelize');

const buildUserWhereClause = (query) => {
  const whereClause = {};

  if (query.email) {
    whereClause.email = {
      [Op.like]: `%${query.email}%`,
    };
  }

  if (query.username) {
    whereClause.username = {
      [Op.like]: `%${query.username}%`,
    };
  }

  if (query.gender) {
    whereClause.gender = {
      [Op.like]: `%${query.gender}%`,
    };
  }

  if (query.roleId) {
    whereClause.roleId = query.roleId;
  }

  return whereClause;
};

module.exports = { buildUserWhereClause };
