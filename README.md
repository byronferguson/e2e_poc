## Description

LessonBuddy service responsible for...

## Installation

```bash
$ yarn
```

## Set-up

- Replace the `googleCloud.json.example` with your local version of `googleCloud.json`
- Replace the `.env.example` with your local version of `.env`
  - Include `MODE="DEV"` in the local configuration
- Update the service base path in `routes.ts`
- Update the database schema in `database-config.service.ts`
  - ATTN: The schema needs to already be defined in the target database before the service can connect to it
- Update the constant names in `constants.ts`
  - Example, for `employee service`
    `export const EMPLOYEE_SERVICE = 'EMPLOYEE_SERVICE'; export const EMPLOYEE_HOSTNAME = 'EMPLOYEE_HOSTNAME'; export const EMPLOYEE_HTTP_PORT = 'EMPLOYEE_HTTP_PORT'; export const EMPLOYEE_TCP_PORT = 'EMPLOYEE_TCP_PORT'; export const EMPLOYEE_RMQ_PORT = 'EMPLOYEE_RMQ_PORT'; export const BASE = 'employee'; export const VERSION = 2; `
- Update the same constants in `main.ts`
- Add the port names to the .env, example below.
  `EMPLOYEE_HOSTNAME="localhost" EMPLOYEE_HTTP_PORT=3500 EMPLOYEE_TCP_PORT=3501 EMPLOYEE_RMQ_PORT=3502`

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode (run first, then start VSCode debugger)
$ yarn start:debug

# production mode
$ yarn start:prod
```

## NestJS

```bash
# Generate the following files for `module-name`: module, controller w/ spec, service w/ spec
$ npm run nest:create --name=module-name

# Generate the following file for `module-name`: module
$ npm run nest:create:module --name=module-name

# Generate the following file for `module-name`: controller w/ spec
$ npm run nest:create:controller --name=module-name

# Generate the following file for `module-name`: service w/ spec
$ npm run nest:create:service --name=module-name
```

## TypeORM

```bash
# Generate an automatic migration file
$ yarn typeorm:migration:generate descriptive-migration-name

# Generate an empty migration file
$ yarn typeorm:migration:create descriptive-migration-name

# Run all migrations
$ yarn typeorm:migration:run

# Revert latest migration
$ yarn typeorm migration:revert
```

## Test

```bash
# unit tests
$ yarn test:watch

# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
