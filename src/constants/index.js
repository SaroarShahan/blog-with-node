const USER_ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

const getOffset = (page, limit) => {
  return page && limit ? (page - 1) * limit : undefined;
};

module.exports = {
  USER_ROLES,
  getOffset,
};
