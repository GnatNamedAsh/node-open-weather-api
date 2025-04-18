import { jest } from '@jest/globals'
import { get } from '@/src/server/routes/weather/handlers'
import { getCurrentWeather } from '@/src/lib/open-weather'
import type { Request, Response } from 'express'

jest.mock('@/src/lib/open-weather', () => ({
  getCurrentWeather: jest.fn(() => ({
    condition: 'clear',
    temp: {
      value: 70,
      unit: 'F',
      qualitative: 'moderate'
    },
    alerts: []
  }))
}))

import type { CurrentWeather } from '@/src/lib/open-weather/types'


describe('Weather Handlers', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockJson: jest.Mock
  let mockStatus: jest.Mock

  beforeEach(() => {
    mockJson = jest.fn()
    mockStatus = jest.fn().mockReturnThis()
    
    mockRequest = {
      query: {}
    }
    
    mockResponse = {
      status: mockStatus as unknown as Response['status'],
      send: mockJson as unknown as Response['send'],
      header: jest.fn().mockReturnThis() as unknown as Response['header']
    }

    jest.clearAllMocks()
  })

  describe('GET /weather', () => {
    it('should return 400 if lat is missing', async () => {
      mockRequest.query = {
        lon: '-74.0060'
      }
      await get(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ message: 'Expected lat and lon query params' })
    })

    it('should return 400 if lon is missing', async () => {
      mockRequest.query = {
        lat: '40.7128'
      }
      await get(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ message: 'Expected lat and lon query params' })
    })

    it('should return weather data when lat and lon are provided', async () => {
      const mockWeatherData: CurrentWeather = {
        condition: 'clear',
        temp: {
          value: 20,
          unit: 'F',
          qualitative: 'moderate'
        },
        alerts: []
      }

      jest.mocked(getCurrentWeather).mockResolvedValue(mockWeatherData)
      
      mockRequest.query = {
        lat: '40.7128',
        lon: '-74.0060'
      }

      await get(mockRequest as Request, mockResponse as Response)

      expect(getCurrentWeather).toHaveBeenCalledWith({
        lat: '40.7128',
        lon: '-74.0060'
      })
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({ data: mockWeatherData })
    })

    it('should handle errors and return 500', async () => {
      const error = new Error('API Error')
      jest.mocked(getCurrentWeather).mockRejectedValue(error)
      
      mockRequest.query = {
        lat: '40.7128', 
        lon: '-74.0060'
      }

      await get(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ message: 'Failed to fetch current weather.' })
    })
  })
}) 