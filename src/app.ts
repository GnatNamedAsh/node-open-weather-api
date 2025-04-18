import 'dotenv/config'
import express from 'express'
import { get } from './routes/weather/handlers'

export const app = express()

app.get('/weather', get)

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => (console.log('Running on port 3000')))
}
