# Docker Guide

## Configure environment variables

Copy `.env.example` to `.env` and set real values for the database user, password, JWT secret, and
token expiry.

For Docker Compose:

- the app service automatically uses `db` as `DB_HOST`
- the MySQL container still listens on `3306` internally
- `DB_PORT` only controls the host machine port, so using `3307` avoids conflicts if local MySQL is
  already using `3306`

## Build and start the containers

```bash
docker compose up --build -d
```

This starts:

- `api`: the Express application
- `db`: a MySQL 8.4 database with a persistent named volume

The API will be available on `http://localhost:8080` when `PORT=8080` in `.env`.

## Run migrations

```bash
docker compose exec api yarn db:migrate
```

## Seed demo data

```bash
docker compose exec api yarn db:seed
```

## Stop the containers

```bash
docker compose down
```

To stop and also remove the database volume:

```bash
docker compose down -v
```

If the MySQL container fails to start with an error like `bind: address already in use`, change
`DB_PORT` in `.env` to a free host port such as `3307`, then restart the stack.

## `run.sh` helper

You can also use the executable [run.sh](../run.sh) helper to run common Docker tasks:

```bash
./run.sh up
./run.sh down
./run.sh restart
./run.sh logs
./run.sh migrate
./run.sh seed
./run.sh status
```

If `run.sh` is not executable on your machine, run the same commands with `bash` instead:

```bash
bash run.sh up
```

To make it executable:

```bash
chmod +x run.sh
```

Command summary:

- `./run.sh up`: build and start the containers in detached mode
- `./run.sh down`: stop the containers
- `./run.sh restart`: rebuild and restart the containers
- `./run.sh logs`: follow container logs
- `./run.sh migrate`: run database migrations in the `api` container
- `./run.sh seed`: run database seeders in the `api` container
- `./run.sh status`: show running container status

Typical Docker flow:

```bash
./run.sh up
./run.sh migrate
./run.sh seed
./run.sh logs
```
