import express from 'express'
import config from 'dotenv'
import { get } from './routes/weather/handlers'

const app = express()

app.get('/weather', get)

app.listen(3000, () => (console.log('Running on port 3000')))
