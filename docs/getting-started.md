# Getting Started

## Install dependencies

```bash
yarn install
```

## Configure environment variables

Copy `.env.example` to `.env` and fill in your database and JWT values.

```env
DB_NAME=blog
DB_USER=root
DB_PASSWORD=admin123456
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3307
PORT=8080
CORS_ORIGIN=http://localhost:3000
DB_LOGGING=false

JWT_SECRET=ILoveNodeJS
JWT_EXPIRES_IN=7d
```

## Run migrations

```bash
yarn db:migrate
```

## Run seeders

```bash
yarn db:seed
```

Seeders add demo roles, permissions, role-permission mappings, users, profiles, categories, tags,
posts, post-category links, post-tag links, and comments.

Demo accounts:

- Admin: `saroar.shahan@gmail.com` / `Admin@1234`
- User: `kuddus@example.com` / `User@1234`

Default seeded roles:

- `super_admin`
- `user`

## Start the server

Development:

```bash
yarn dev
```

Production:

```bash
yarn start
```

The API starts on the port from `PORT` or falls back to `4000`.
