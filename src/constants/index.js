const USER_ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

const AUTHORIZATION_POLICIES = Object.freeze({
  OWNER_ONLY: Object.freeze({ allowAdmin: false }),
  OWNER_OR_ADMIN: Object.freeze({ allowAdmin: true }),
});

const getOffset = (page, limit) => {
  return page && limit ? (page - 1) * limit : undefined;
};

module.exports = {
  AUTHORIZATION_POLICIES,
  USER_ROLES,
  getOffset,
};
