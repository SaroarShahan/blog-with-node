# API Reference

Base URL: `/api/v1`

## Auth

- `POST /auth/register` (rate limited)
- `POST /auth/login` (rate limited)

`POST /auth/register` accepts:

- `username`
- `email`
- `password`
- `gender`
- optional `roleId`

## Users

- `GET /users/:userId/posts` (public)
- `POST /users` (authenticated, privileged)
- `GET /users` (authenticated, privileged)
- `GET /users/:id` (authenticated, privileged)
- `PATCH /users/:id` (authenticated, privileged)
- `DELETE /users/:id` (authenticated, privileged)
- `PATCH /users/:id/profile` (authenticated, privileged)

## Posts

- `POST /posts` (authenticated)
- `GET /posts`
- `GET /posts/:idOrSlug`
- `PATCH /posts/:idOrSlug` (post author only)
- `PATCH /posts/:idOrSlug/publish` (post author only)
- `DELETE /posts/:idOrSlug` (post author or privileged user)

## Categories

- `POST /categories` (authenticated, privileged)
- `GET /categories` (public)
- `GET /categories/:idOrSlug` (public)
- `PATCH /categories/:idOrSlug` (authenticated, privileged)
- `DELETE /categories/:idOrSlug` (authenticated, privileged)

## Tags

- `POST /tags` (authenticated, privileged)
- `GET /tags` (public)
- `GET /tags/:idOrSlug` (public)
- `PATCH /tags/:idOrSlug` (authenticated, privileged)
- `DELETE /tags/:idOrSlug` (authenticated, privileged)

## Comments

- `POST /comments` (authenticated)
- `GET /comments/:postId` (authenticated)
- `PATCH /comments/:id` (comment author only)
- `DELETE /comments/:id` (privileged user, comment author, or post author)

## Permissions

- `GET /permissions` (authenticated, requires permission access)

Optional query:

- `module`

## Roles

- `POST /roles` (authenticated, requires `create_role`)
- `GET /roles` (authenticated, requires `view_roles`)
- `GET /roles/:id` (authenticated, requires `view_role`)
- `PATCH /roles/:id` (authenticated, requires `edit_role`)
- `DELETE /roles/:id` (authenticated, requires `delete_role`)

## Health Check

- `GET /health`
