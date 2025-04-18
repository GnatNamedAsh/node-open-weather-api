import 'dotenv/config'
import express from 'express'
import { get } from './routes/weather/handlers'

export const app = express()

// If we were to expand out the API to include hourly, daily, etc.
// We'd want to dynamically set these routes using some kind of
// recursive directory algorithm. Everything in /routes will
// directly relate to the endpoint. e.g. endpoint handlers for
// `/weather/current` will be in `/routes/weather/current/handlers`
// and `/weather/hourly` will be in `/routes/weather/hourly/handlers`
// we can still have `/weather` under `/routes/weather/handlers` and
// adjust its implementation there.
app.get('/weather', get)

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => (console.log('Running on port 3000')))
}
