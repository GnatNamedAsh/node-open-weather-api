import { getEnvVar } from "../utils";

export const API_KEY = getEnvVar('OPEN_WEATHER_API_KEY')
export const HOST_URL = getEnvVar(`OPEN_WEATHER_HOST_URL`)
// We have to use onecall in order to get alerts
export const API_ENDPOINT = '/data/3.0/onecall'

export const METHODS = {
  GET: 'GET'
} as const

export const EXCLUDED_FIELDS = ['hourly', 'daily', 'minutely']
export const UNITS = 'imperial' // using F instead of K or C for temps

export const DEFAULT_SEARCH_PARAMS = {
  exclude: EXCLUDED_FIELDS,
  units: UNITS
} as const

export const DEFAULT_WEATHER_CONDITION = 'clear'
