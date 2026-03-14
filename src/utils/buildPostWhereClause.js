const { Op } = require('sequelize');

const buildPostWhereClause = ({ status = 'published', title, search }) => {
  const whereClause = {};

  if (status) {
    whereClause.status = status;
  }

  if (title) {
    whereClause.title = {
      [Op.like]: `%${title}%`,
    };
  }

  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } },
      { excerpt: { [Op.like]: `%${search}%` } },
    ];
  }

  return whereClause;
};

module.exports = { buildPostWhereClause };
