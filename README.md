# blog-with-node

REST API for a blog application built with Express, Sequelize, MySQL, and JWT authentication.

## Stack

- Node.js
- Express
- Sequelize
- MySQL
- JWT via `jose`
- Password hashing with `bcrypt`

## Features

- User registration and login
- JWT-protected routes
- Role-based admin middleware
- Centralized request validation with Zod
- Posts with categories and tags
- Nested comments support
- Author-only post updates and admin-enabled post deletes
- Comment moderation by admin, comment author, or post author
- Sequelize migrations and seeders

## Project Structure

```text
.
├── migrations/
├── seeders/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your database and JWT values.

```env
DB_NAME=blog
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=mysql
DB_PORT=3306
PORT=8080

JWT_SECRET=
JWT_EXPIRES_IN=
```

### 3. Run migrations

```bash
yarn db:migrate
```

### 4. Run seeders

```bash
yarn db:seed
```

Seeders add demo users, profiles, categories, tags, posts, post-category links, post-tag links, and
comments.

Demo accounts:

- Admin: `saroar.shahan@gmail.com` / `Admin@1234`
- User: `kuddus@example.com` / `User@1234`

### 5. Start the server

Development:

```bash
yarn dev
```

Production:

```bash
yarn start
```

The API starts on the port from `PORT` or falls back to `4000`.

## Scripts

```bash
yarn dev
yarn start
yarn db:migrate
yarn db:migrate:undo
yarn db:migrate:undo:all
yarn db:seed
yarn db:seed:undo
```

## API Routes

Base URL: `/api/v1`

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users

- `GET /users/:userId/posts` (authenticated, admin only)
- `POST /users` (authenticated, admin only)
- `GET /users` (authenticated, admin only)
- `GET /users/:id` (authenticated, admin only)
- `PATCH /users/:id` (authenticated, admin only)
- `DELETE /users/:id` (authenticated, admin only)

### Posts

- `POST /posts` (authenticated)
- `GET /posts`
- `GET /posts/:idOrSlug`
- `PATCH /posts/:idOrSlug` (post author only)
- `DELETE /posts/:idOrSlug` (post author or admin)

### Categories

- `POST /categories` (authenticated, admin only)
- `GET /categories` (authenticated, admin only)
- `GET /categories/:idOrSlug` (authenticated, admin only)
- `PATCH /categories/:idOrSlug` (authenticated, admin only)
- `DELETE /categories/:idOrSlug` (authenticated, admin only)

### Tags

- `POST /tags` (authenticated, admin only)
- `GET /tags` (authenticated, admin only)
- `GET /tags/:idOrSlug` (authenticated, admin only)
- `PATCH /tags/:idOrSlug` (authenticated, admin only)
- `DELETE /tags/:idOrSlug` (authenticated, admin only)

### Comments

- `POST /comments` (authenticated)
- `GET /comments/:postId` (authenticated)
- `PATCH /comments/:id` (comment author only)
- `DELETE /comments/:id` (admin, comment author, or post author)

## Health Check

- `GET /health`

## Notes

- Protected routes require an `Authorization: Bearer <token>` header.
- Request payloads, params, and supported query values are validated with centralized Zod middleware.
- User management routes are authenticated and admin-only.
- Category and tag management routes are authenticated and admin-only.
- Post updates are allowed only for the post author.
- Post deletes are allowed for the post author or an admin.
- Comment updates are allowed only for the comment author.
- Comment deletes are allowed for an admin, the comment author, or the author of the parent post.
- Database connection is verified during server startup before the app begins listening.
