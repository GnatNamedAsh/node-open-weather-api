import { API_KEY } from './constants'

const API_HOST_URL = 'https://api.openweathermap.org'
// We have to one call in order to get alerts, so might as well digest from there
const ENDPOINT = '/data/3.0/onecall'
const METHODS = {
  GET: 'GET'
} as const

const EXCLUDED_FIELDS = ['hourly', 'daily', 'minutely']
const UNITS = 'imperial' // using F instead of K or C for temps

const DEFAULT_SEARCH_PARAMS = {
  exclude: EXCLUDED_FIELDS,
  units: UNITS
} as const

export type OpenWeatherCoordinates = {
  lat: string // float as string
  lon: string // float as string
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
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  alerts: {
    sender_name: string
    event: string
    start: number
    end: number
    description: string
    tags: string
  }
}

// only going to type out the fields we're keeping, so excluded fields won't be typed
type OpenWeatherApiResponse = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: OpenWeatherCurrentWeather
}

const createSearchParams = (coord: OpenWeatherCoordinates, useDefault: boolean = true) => {
  const searchParams = new URLSearchParams()
  const defaults = useDefault ? DEFAULT_SEARCH_PARAMS : {}

  const params = {
    ...coord,
    ...defaults,
    appid: API_KEY
  }

  Object.entries(params).map(([key, value]) => searchParams.set(key, value))

  return searchParams
} 

// if expanding out to other APIs, add in generic types for response type and request param type
export const openWeatherApiCall = async (params: OpenWeatherCoordinates): Promise<OpenWeatherApiResponse> => {
  const url = new URL(`${API_HOST_URL}${ENDPOINT}`)
  const searchParams = createSearchParams(params)
  url.search = searchParams.toString()

  const res = await fetch(url, { method: METHODS.GET });

  // handle error codes here
  if (!res.ok) {
    // arguably, we want to create a custom error object to better handle errors from this service
    // however, for now we'll just use a regular error throw and catch it somewhere upstream
    throw new Error(`Failed to fetch current weather with status code ${res.status}`)
  }
  return (await res.json()) as OpenWeatherApiResponse
}
