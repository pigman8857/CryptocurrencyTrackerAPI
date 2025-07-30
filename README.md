# Crypto Currency Tracker

## Description

[CryptocurrencyTracker](https://github.com/pigman8857/CryptocurrencyTracker) is the CryptoPortfolio tracker.

This project is the NestJs BackEnd part

## Project setup

```bash
$ npm install
```

## Dependencies version

By the time this project has been created and developed.

- Node 22.17.1

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## More required packages

```bash
# install cross-env as global. cross-env is needed for db migration and running application commands
$ npm install -g cross-env

# ts-node is needed for migration commands
$ npm install ts-node --save-dev
# or below if you want to install as global
$ npm install -g ts-node

# typeorm cli, is used for database migration.
$ npm install -g typeorm
```

## Database schema Migration commands

```bash
# Generate migration based on what have been changed in entity files and Database.
$ NODE_ENV={environment} npm run migrate:generate ./src/migrations/{migration name}
# OR this one but need global cross-env installed on your machine
$ cross-env NODE_ENV={environment} npm run migrate:generate ./src/migrations/{migration name}

# Create empty migration
$ npm run migrate:create ./src/migrations/{migration name}

# Run migrations
$ NODE_ENV={environment} npm run migrate:up
# OR this one but need global cross-env installed on your machine
$ cross-env NODE_ENV={environment} npm run migrate:up

# revert migration
$ NODE_ENV={environment} npm run migrate:down
# or but need global cross-env installed on your machine
$ cross-env NODE_ENV={environment} npm run migrate:down


```

#
