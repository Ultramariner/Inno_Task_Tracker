# Task Tracker

Task‑tracking system built with **Java 21 + Spring Boot**, **Angular 20**, **PostgreSQL**, and **Keycloak**.  
Environment runs via **Docker Compose**.

## Quick Start

Run the whole stack:

```bash
docker compose up --build
```

## Services

- **UI:** http://localhost:8082
- **API:** http://localhost:8081
- **Keycloak:** http://localhost:8080
- **PostgreSQL:** localhost:5433

## Keycloak

- Realm is auto‑imported from `./keycloak`

## Databases

- `keycloak` — used by Keycloak
- `task_tracker` — used by the application (migrations via Flyway)

## Development

Run API locally:

```bash
cd api
mvn spring-boot:run
```

Run UI locally:

```bash
cd ui
npm install
npm start
```

API debug port: **5005**
