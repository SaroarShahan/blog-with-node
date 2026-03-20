#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./run.sh <command>

Commands:
  up         Build and start the containers in detached mode
  down       Stop the containers
  restart    Restart the containers
  logs       Follow container logs
  migrate    Run database migrations in the api container
  seed       Run database seeders in the api container
  status     Show container status
EOF
}

require_compose() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker is not installed or not available in PATH."
    exit 1
  fi
}

cmd="${1:-}"

require_compose

case "$cmd" in
  up)
    docker compose up --build -d
    ;;
  down)
    docker compose down
    ;;
  restart)
    docker compose down
    docker compose up --build -d
    ;;
  logs)
    docker compose logs -f
    ;;
  migrate)
    docker compose exec api yarn db:migrate
    ;;
  seed)
    docker compose exec api yarn db:seed
    ;;
  status)
    docker compose ps
    ;;
  *)
    usage
    exit 1
    ;;
esac
