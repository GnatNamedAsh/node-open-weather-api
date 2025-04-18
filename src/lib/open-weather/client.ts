import { API_KEY, METHODS, DEFAULT_SEARCH_PARAMS, API_ENDPOINT, HOST_URL, DEFAULT_WEATHER_CONDITION } from './constants'
import type { CurrentWeather, OpenWeatherApiResponse, OpenWeatherCoordinates } from './types'
import { determineWeatherCondition, getQualitativeTemp, createSearchParams } from './utils'

// if expanding out to other APIs, create a type union for the params
export const openWeatherApiCall = async <T>(params: OpenWeatherCoordinates): Promise<T> => {
  const url = new URL(`${HOST_URL}${API_ENDPOINT}`)
  const searchParams = createSearchParams(params)
  url.search = searchParams.toString()

  const res = await fetch(url, { method: METHODS.GET });

  // handle error codes here
  if (!res.ok) {
    // arguably, we want to create a custom error object to better handle errors from this service
    // however, for now we'll just use a regular error throw and catch it somewhere upstream
    throw new Error(`Failed to fetch current weather with status code ${res.status}`)
  }
  return (await res.json()) as T
}


export const getCurrentWeather = async (params: OpenWeatherCoordinates): Promise<CurrentWeather> => {
  const { current, alerts } = await openWeatherApiCall<OpenWeatherApiResponse>(params)

  // reshape for what we care about
  const currentWeather = current.weather?.[0]
  const condition = currentWeather ? determineWeatherCondition(currentWeather) : DEFAULT_WEATHER_CONDITION
  const reshapedAlerts = alerts?.map( alert => ({
    title: alert.event,
    description: alert.description
  }))

  const temp = {
    value: current.temp,
    unit: 'F' as 'F', // work around for the type check on string literals vs string union
    qualitative: getQualitativeTemp(current.temp)
  }
   
  return {
    condition,
    alerts: reshapedAlerts,
    temp
  }
}
