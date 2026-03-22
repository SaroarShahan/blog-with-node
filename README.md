# blog-with-node

REST API for a blog application built with Express, Sequelize, MySQL, and JWT authentication.

## Stack

- Node.js
- Express
- Sequelize
- MySQL
- JWT via `jose`
- Password hashing with `bcrypt`
- Zod for request validation
- Pino for structured logging

## Features

- User registration and login
- JWT-protected routes
- RBAC with roles and permissions
- Centralized request validation with Zod
- Baseline API hardening with Helmet, CORS, and compression
- Auth endpoint rate limiting for login/register
- Structured request logging with request IDs and latency
- Posts with categories and tags
- Nested comments support
- Sequelize migrations and seeders
- Docker support with `run.sh`

## Docs

- [Getting Started](docs/getting-started.md)
- [Docker Guide](docs/docker.md)
- [API Reference](docs/api.md)
- [RBAC Guide](docs/rbac.md)

## Quick Start

```bash
yarn install
cp .env.example .env
yarn db:migrate
yarn db:seed
yarn dev
```

The API starts on the port from `PORT` or falls back to `4000`.

## Project Structure

```text
.
├── .dockerignore
├── .env.example
├── .sequelizerc
├── Dockerfile
├── README.md
├── docker-compose.yml
├── docs/
├── migrations/
├── package.json
├── run.sh
├── seeders/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── errors/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
└── yarn.lock
```

## Scripts

```bash
yarn dev
yarn start
yarn lint
yarn lint:fix
yarn format
yarn prepare
yarn db:migrate
yarn db:migrate:undo
yarn db:migrate:undo:all
yarn db:seed
yarn db:seed:undo:all
```
