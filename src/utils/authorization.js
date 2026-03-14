const { USER_ROLES } = require('../constants');

const isOwnerOrAdmin = (user, ownerIdOrIds) => {
  const ownerIds = Array.isArray(ownerIdOrIds) ? ownerIdOrIds : [ownerIdOrIds];

  return user.role === USER_ROLES.ADMIN || ownerIds.includes(user.id);
};

exports.canEdit = (user, ownerId) => isOwnerOrAdmin(user, ownerId);
exports.canDelete = (user, ownerId) => isOwnerOrAdmin(user, ownerId);
