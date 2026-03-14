const { AUTHORIZATION_POLICIES, USER_ROLES } = require('../constants');

const hasOwnership = (user, ownerIdOrIds) => {
  const ownerIds = Array.isArray(ownerIdOrIds) ? ownerIdOrIds : [ownerIdOrIds];

  return ownerIds.includes(user.id);
};

const isOwnerOrAdmin = (user, ownerIdOrIds) => {
  if (user.role === USER_ROLES.ADMIN) {
    return true;
  }

  return hasOwnership(user, ownerIdOrIds);
};

const matchesPolicy = (user, ownerIdOrIds, policy) => {
  return policy.allowAdmin ? isOwnerOrAdmin(user, ownerIdOrIds) : hasOwnership(user, ownerIdOrIds);
};

exports.canEdit = (user, ownerId, policy = AUTHORIZATION_POLICIES.OWNER_ONLY) => {
  return matchesPolicy(user, ownerId, policy);
};

exports.canDelete = (user, ownerId, policy = AUTHORIZATION_POLICIES.OWNER_OR_ADMIN) => {
  return matchesPolicy(user, ownerId, policy);
};
