import { describe, it, expect, jest, afterEach, beforeEach } from '@jest/globals'
import { openWeatherApiCall } from '@/lib/open-weather'

const { spyOn, restoreAllMocks } = jest

// going to move this mock out of this file eventually when I set up other tests
const mockSuccessBody = {
  lat: 50,
  lon: 50,
  timezone: 'CST',
  timezone_offset: 1800,
  // Will fill this out with a real response later
  current: {
    blah: 'bleh',
    bleh: 'bloo',
    bloo: 'blah'
  }
}

describe('Open Weather API Client', () => {
  let fetchMock: any = undefined
  const expectedUrl = 'https://api.openweathermap.org/data/3.0/onecall'
  const mockParams = { lon: '50', lat: '50' }

  beforeEach(() => {
    fetchMock = spyOn(global, 'fetch') 
  })

  afterEach(() => { restoreAllMocks() })

  it('should make an api call to the correct endpoint', async () => {
    const jsonMock = jest.fn(async () => (mockSuccessBody))
    fetchMock.mockImplementation(() => (Promise.resolve({
      ok: true,
      json: jsonMock
    })))
    const response = await openWeatherApiCall(mockParams) 

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
        await openWeatherApiCall(mockParams)

        throw new Error('Should have thrown an error here')
      } catch (err: any) {
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(err?.message).toBeDefined()
        expect(err.message).toContain("401")
      }
    })
})
