<div align="center">
  <h1>jupiter-api-enhanced</h1>
</div>

> An awesome project based on Ts.ED framework

## Getting started

> **Important!** Ts.ED requires Node >= 20.x or Bun.js and TypeScript >= 5.

```batch
# install dependencies
$ yarn install

# serve
$ yarn dev

# build for production
$ yarn build
$ yarn start
```

## Docker

```
# build docker image
docker compose build

# start docker image
docker compose up
```

```json
{
  "directory": ["./src/controllers/v1"],
  "exclude": ["**/__mock__", "**/__mocks__", "**/*.spec.ts"],
  "delete": true
}
```
