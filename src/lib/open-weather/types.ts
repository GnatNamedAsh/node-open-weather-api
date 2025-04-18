export type OpenWeatherCoordinates = {
  lat: string // float as string
  lon: string // float as string
}

export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type OpenWeatherCurrentWeather = {
  dt: number
  sunrise: number // Date Number
  sunset: number // Date Number
  temp: number
  feels_like: number
  pressure: number
  humidity: number // percentage
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Array<Weather> 
}

// only going to type out the fields we're keeping, so excluded fields won't be typed
export type OpenWeatherApiResponse = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: OpenWeatherCurrentWeather
  alerts: {
    sender_name: string
    event: string
    start: number
    end: number
    description: string
    tags: string
  }[]
}

export type CurrentWeather = {
  condition: string
  temp: {
    value: number
    unit: 'F' | 'K' | 'C'
    qualitative: 'hot' | 'cold' | 'moderate'
  },
  alerts: {
    title: string,
    description: string
  }[]
}
