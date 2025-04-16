# Node Open Weather API

## Description

A simple API wrapper/digester for the Open Weather API written using Express web servers.

## Development Tools

I primarily used the bun run time for development. Tests are written in Jest compared to bun's testing framework.

Regardless, the application should be runtime agnostic and work with node, deno, and bun for versatility purposes.

A Dockerfile and a docker compose file will be included if you'd rather run it in a preconfigured container environment.

This will utilize the `OPEN_WEATHER_API_KEY` env var that should be set by you and should be seen in the `.env.example` file.

I've chosen not to use AI and stuck to just using nvim and basic LSP autocomplete for development.

## Testing

The implementation will include unit tests for utilities with mocked API calls, and integration tests with mocked API calls.

I'm also including e2e tests, but since the tests will not used mocked API calls, it isn't included in the full test suite to prevent running up your API key and possibly pushing you passed the free call limit.

Included is a bash script that will also do a form of e2e tests using cURL or httpie (if installed) for the running service.

To run the full test suite use:

`bun test`
`pnpm test`
`yarn test`
`npm test`

## Purpose

This is part of the hiring process as a project.

## Licensing

This repo uses the MIT license and is free to use.
