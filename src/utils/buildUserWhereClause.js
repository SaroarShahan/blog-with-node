const { Op } = require("sequelize");

const buildUserWhereClause = (query) => {
    const whereClause = {};

    if (query.email) {
        whereClause.email = {
            [Op.like]: `%${query.email}%`
        };
    }

    if (query.firstName) {
        whereClause.firstName = {
            [Op.like]: `%${query.firstName}%`
        };
    }

    if (query.lastName) {
        whereClause.lastName = {
            [Op.like]: `%${query.lastName}%`
        };
    }

    if (query.gender) {
        whereClause.gender = {
            [Op.like]: `%${query.gender}%`
        };
    }

    if (query.role) {
        whereClause.role = {
            [Op.like]: `%${query.role}%`
        };
    }

    return whereClause;
};

module.exports = { buildUserWhereClause };