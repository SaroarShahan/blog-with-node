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
- Posts with categories and tags
- Nested comments support
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
DB_NAME=learning_sequelize
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

- Admin: `admin@example.com` / `Admin1234`
- User: `saroar@example.com` / `User1234`
- User: `nabila@example.com` / `Editor1234`

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

- `GET /users/:userId/posts`
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Posts

- `POST /posts`
- `GET /posts`
- `GET /posts/:idOrSlug`
- `PATCH /posts/:idOrSlug`
- `DELETE /posts/:idOrSlug`

### Categories

- `POST /categories`
- `GET /categories`
- `GET /categories/:idOrSlug`
- `PATCH /categories/:idOrSlug`
- `DELETE /categories/:idOrSlug`

### Tags

- `POST /tags`
- `GET /tags`
- `GET /tags/:idOrSlug`
- `PATCH /tags/:idOrSlug`
- `DELETE /tags/:idOrSlug`

### Comments

- `POST /comments`
- `GET /comments/:postId`
- `PATCH /comments/:id`
- `DELETE /comments/:id`

## Health Check

- `GET /health`

## Notes

- Protected routes require an `Authorization: Bearer <token>` header.
- Category and tag management routes are guarded by admin middleware.
- Database connection is verified during server startup before the app begins listening.
