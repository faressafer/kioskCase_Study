# Case study: Kiosk Case Study

Welcome to the Kiosk case study --Fares Sfaer!

This is a [Remix](https://remix.run/docs) application but don’t worry, you will grasp it easily.

Please install the project, run it locally, and you will see what you have to do for this case study.

Good luck!

## Development

Install:

```sh
pnpm i
```

Run the database (suggested with docker compose, do what you prefer):

```sh
docker-compose up -d
```

Setup your environment

```sh
cp .env.template .env
```

Run migrations:

```
pnpm prisma migrate dev
pnpm prisma generate
pnpm tsx prisma/seed.ts
```

Run the dev server:

```sh
pnpm dev
```
