const { Op } = require("sequelize");

const buildPostWhereClause = (query) => {
    const whereClause = {};

    if (query.title) {
        whereClause.title = {
            [Op.like]: `%${query.title}%`
        };
    }

    return whereClause;
};

module.exports = { buildPostWhereClause };