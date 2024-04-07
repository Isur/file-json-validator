# TS-Starter

Typescript starter with:

- swc
- jest
- eslint
- prettier
- Dockerfile

# Config

Setup Environment variables in `.env` file.

Example config is in `.env-template` file.

| ENV  | Definition                   |
| ---- | ---------------------------- |
| PORT | Port on which app is running |
| ENV  | development or production    |

# Scripts

| Script     | Definition                          |
| ---------- | ----------------------------------- |
| dev        | Run dev with hot reload             |
| build      | Build app                           |
| start      | Run builded app                     |
| clean      | Remove build                        |
| typecheck  | Check types with tsc                |
| test       | Run jest tests with coverage report |
| test:watch | Run jest tests with watch mode      |
| lint       | Run eslint and prettier checks      |
| lint:fix   | Run eslint and prettier fix         |

# Deploy

App is builded into `./dist` directory.

There is also `Dockerfile` and `docker-compose.yml` files.

Docker compose will spin app up, just remember about `.env` file.

# Dependencies

This starter is using `swc` for compiling app. To run hot reload development there is `nodemon` watching generated `.js` files, `chokidar` used with `swc` to compile, and `concurrently` to run together compiler and app.

For static code checking there is `eslint` with plugins and `prettier`.

Testing is done with `jest`.

Environment config is loaded with `dotenv` and `dotenv-expand`.

For schema validation `zod` is used.
