import { getCurrentWeather, openWeatherApiCall } from '@/src/lib/open-weather'
import { OpenWeatherApiResponse } from '@/src/lib/open-weather/types'

const { spyOn, restoreAllMocks } = jest

// going to move this mock out of this file eventually when I set up other tests
const mockSuccessBody = {
  lat: 42.8975,
  lon: -106.4731,
  timezone: 'America/Denver',
  timezone_offset: -21600,
  current: {
    dt: 1744950378,
    sunrise: 1744892414,
    sunset: 1744941004,
    temp: 25.21,
    feels_like: 12.61,
    pressure: 1015,
    humidity: 95,
    dew_point: 24.13,
    uvi: 0,
    clouds: 100,
    visibility: 2414,
    wind_speed: 16.11,
    wind_deg: 40,
    weather: [
      {
        id: 600,
        main: 'Snow',
        description: 'light snow',
        icon: '13n',
      }, {
        id: 701,
        main: 'Mist',
        description: 'mist',
        icon: '50n',
      }
    ],
    snow: {
      '1h': 0.13,
    },
  },
  alerts: [
    {
      sender_name: 'NWS Riverton WY',
      event: 'Winter Storm Warning',
      start: 1744928760,
      end: 1744999200,
      description: '* WHAT...Heavy snow... <truncated for the mock>',
      tags: ['Wind', 'Snow/Ice'],
    },
  ],
}

describe('Open Weather API', () => {
  let fetchMock: any = undefined
 
  beforeEach(() => {
    fetchMock = spyOn(global, 'fetch') 
  })

  afterEach(() => { restoreAllMocks() })

  describe('API Client', () => {

    const expectedUrl = 'https://api.openweathermap.org/data/3.0/onecall'
    const mockParams = { lon: '50', lat: '50' }

    it('should make an api call to the correct endpoint', async () => {
      const jsonMock = jest.fn(async () => (mockSuccessBody))
      fetchMock.mockImplementation(() => (Promise.resolve({
        ok: true,
        json: jsonMock
      })))
      const response = await openWeatherApiCall<OpenWeatherApiResponse>(mockParams) 

      expect(response?.current).toBeDefined()
      expect(fetchMock).toHaveBeenCalledTimes(1)
      const argUrl = fetchMock.mock.calls[0][0]
      expect(argUrl.origin + argUrl.pathname).toEqual(expectedUrl)
      expect(jsonMock).toHaveBeenCalled()
    })

    it(
      'should throw an error if response is not okay and include the status code in the error message',
      async () => {
        fetchMock.mockImplementation(() => (Promise.resolve({
          ok: false,
          status: 401
        })))

        try {
          await openWeatherApiCall<OpenWeatherApiResponse>(mockParams)

          throw new Error('Should have thrown an error here')
        } catch (err: any) {
          expect(fetchMock).toHaveBeenCalledTimes(1)
          expect(err?.message).toBeDefined()
          expect(err.message).toContain('401')
        }
      })
  })

  describe('Get Current Weather', () => {
    const mockParams = { lon: '50', lat: '50' }
    const expectedUrl = 'https://api.openweathermap.org/data/3.0/onecall'

    it('should return current weather shaped in the way we want', async () => {
      const jsonMock = jest.fn(async () => (mockSuccessBody))
      fetchMock.mockImplementation(() => (Promise.resolve({
        ok: true,
        json: jsonMock
      })))

      const response = await getCurrentWeather(mockParams)

      expect(response).toBeDefined()
      expect(response.condition).toBeDefined()
      expect(response.condition).toBe('snow')

      expect(response.temp).toBeDefined()
      expect(response.temp.value).toBe(25.21)
      expect(response.temp.unit).toBe('F')
      expect(response.temp.qualitative).toBe('cold')

      expect(response.alerts).toBeDefined()
      expect(response.alerts.length).toBe(1)
      expect(response.alerts[0]?.title).toBe('Winter Storm Warning')
      expect(response.alerts[0]?.description).toBe('* WHAT...Heavy snow... <truncated for the mock>')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      const argUrl = fetchMock.mock.calls[0][0]
      expect(argUrl.origin + argUrl.pathname).toEqual(expectedUrl)
      expect(jsonMock).toHaveBeenCalled()
    })
  })
})

