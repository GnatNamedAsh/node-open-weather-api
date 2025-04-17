import { Weather } from "./types"
import { DEFAULT_WEATHER_CONDITION } from "./constants"

export const getQualitativeTemp = (temp: number): 'hot' | 'cold' | 'moderate' => {
  if (temp <= 55) return 'cold'
  if (temp >= 85) return 'hot'
  return 'moderate'
}

export const determineWeatherCondition = ({ id }: Weather): string => {
  if (200 <= id && id <= 232) return 'thunderstorms'
  if (300 <= id && id <= 321) return 'drizzle'
  if (500 <= id && id <= 531) return 'rain'
  if (600 <= id && id <= 622) return 'snow'
  if (801 <= id && id <= 804) return 'cloudy'

  // id 800 'clear', but we'll use it as the default for now
  return DEFAULT_WEATHER_CONDITION
}
