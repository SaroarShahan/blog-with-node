# RBAC Guide

## Overview

The application uses RBAC with these core tables:

- `roles`
- `permissions`
- `role_permissions`
- `users.role_id`

A user currently has one role, and a role can have many permissions.

## Permission shape

Permissions are stored with:

- `name`
- `label`
- `module`

Example:

```json
{
  "id": 1,
  "name": "create_user",
  "label": "Create user",
  "module": "user"
}
```

## Role shape

Roles are stored with:

- `id`
- `name`

Permissions are attached through the `role_permissions` join table.

## Auth flow

Authenticated requests load:

- the user
- the user role
- the role permissions

Then the middleware attaches:

- `req.user.roleId`
- `req.user.role`
- `req.user.permissions`

## Authorization

The project includes permission-based authorization middleware.

Example:

```js
authorize('create_role');
authorize('edit_post');
authorize('view_permissions');
```

The middleware also supports a `manage_<module>` fallback, so a permission like `manage_user` can
cover:

- `create_user`
- `view_user`
- `edit_user`
- `delete_user`

## Seeded roles

- `super_admin`
- `user`

## Notes

- Protected routes require an `Authorization: Bearer <token>` header.
- Request payloads, params, and supported query values are validated with centralized Zod
  middleware.
- Security middleware enabled: `helmet`, controlled `cors`, and `compression`.
- Auth rate limits: login is limited to 5 requests per 15 minutes per IP, and register is limited to
  5 requests per hour per IP.
- Structured request logs include request ID, method, path, status code, latency, and user ID when
  authenticated.
- Controllers delegate business logic to dedicated service modules under `src/services`.
- Pre-commit checks are enforced by Husky and lint-staged with ESLint and Prettier.
- Database connection is verified during server startup before the app begins listening.
- Sequelize config supports both `development` and `production`, which is required for the Docker
  container because it runs with `NODE_ENV=production`.
