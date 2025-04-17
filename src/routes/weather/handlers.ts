import type { Request, Response } from "express";
import { getCurrentWeather } from '@/lib/open-weather'

export const get = async (req: Request, res: Response) => {
  try {
  const weatherResponse = getCurrentWeather()

  res
    .header({
      'Content-Type': 'application/json'
    })
    .status(200)
    .send({ data: weatherResponse  })
  } catch (err: any) {
    // once we have custoe errors, we should check if err is typeof that error
    // for now, we'll just send out a 500 and "log" the error message to a log drain
    console.error(err.message)
    res.status(500).send({ message: 'Failed to fetch current weather.' })
  }
}
