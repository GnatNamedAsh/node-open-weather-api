# Node Open Weather API

## Description

A simple API wrapper/digester for the Open Weather API written using Express web servers.

It will essentially reverse proxy to the open weather api and return the pertinent information.

The endpoint will be `/weather` with query/search parameters `lat` and `lon` for fetching the data.

## Development Tools

I primarily used the bun run time. Tests are written in Jest though to not lock in someone to s a specific runtime.
Regardless, I have a goal that the application should be runtime agnostic and work with node/node-ts, deno, and bun for versatility purposes.

A Dockerfile and a docker compose file will be included if you'd rather run it in a preconfigured container environment.

This will utilize the `OPEN_WEATHER_API_KEY` env var that should be set by you and should be seen in the `.env.example` file.

I've chosen not to use AI and stuck to just using nvim and basic LSP autocomplete for development.

## Testing

The implementation will include unit tests for utilities with mocked API calls, and e2e tests with mocked API calls.

I'll also included is a bash script that will do unmocked e2e tests using cURL or httpie (if installed) if you have the server running.

To run the full test suite use:
```
bun test
pnpm test
yarn test
npm test
```

## TODO

A single endpoint that retuns:
- [x] the weather condition is outside in that area (snow, rain,etc) 
- [x] whether it’s hot, cold, or moderate outside, we're using Fahrenheit, so <= 55 is cold, >= 85 is hot, and moderate is inbetween.
- [x] whether there are any weather alerts going on in that area and what is going on if there is currently an active alert.

## Purpose

This is part of the hiring process as a project.

## Licensing

This repo uses the MIT licensing.
