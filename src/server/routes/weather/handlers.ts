import { getCurrentWeather } from '@/src/lib/open-weather'
import type { Request, Response } from 'express'

export const get = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query
    if (!lat || !lon) {
      res
        .status(400)
        .send({ message: 'Expected lat and lon query params' })
      return
    }

    const params = { lat: lat.toString(), lon: lon.toString() }

    const weatherResponse = await getCurrentWeather(params)

    res
      .header({
        'Content-Type': 'application/json'
      })
      .status(200)
      .send({ data: weatherResponse  })
  } catch (err: any) {
    // once we have custom errors, we should check if err is typeof that error
    // for now, we'll just send out a 500 and "log" the error message to a log drain
    console.error(err.message)
    res.status(500).send({ message: 'Failed to fetch current weather.' })
  }
}
