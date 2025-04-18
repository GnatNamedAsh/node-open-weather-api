import request from 'supertest'
import { app } from '@/src/server/app'
import { getCurrentWeather } from '@/src/lib/open-weather'

// Mock the open-weather module
jest.mock('@/src/lib/open-weather')

describe('Weather E2E Tests', () => {
  beforeAll(() => {
    // Mock the getCurrentWeather function
    (getCurrentWeather as jest.Mock).mockImplementation(async (params) => {
      return {
        main: { temp: 20 },
        weather: [{ description: 'clear sky' }],
        coord: params
      }
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('GET /weather', () => {
    it('should return 400 if lat and lon are missing', async () => {
      const response = await request(app)
        .get('/weather')
        .expect(400)

      expect(response.body).toEqual({
        message: 'Expected lat and lon query params'
      })
    })

    it('should return weather data when lat and lon are provided', async () => {
      const response = await request(app)
        .get('/weather?lat=40.7128&lon=-74.0060')
        .expect(200)

      expect(response.body).toEqual({
        data: {
          main: { temp: 20 },
          weather: [{ description: 'clear sky' }],
          coord: {
            lat: '40.7128',
            lon: '-74.0060'
          }
        }
      })

      expect(getCurrentWeather).toHaveBeenCalledWith({
        lat: '40.7128',
        lon: '-74.0060'
      })
    })

    it('should handle API errors gracefully', async () => {
      // Mock an error response
      (getCurrentWeather as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

      const response = await request(app)
        .get('/weather?lat=40.7128&lon=-74.0060')
        .expect(500)

      expect(response.body).toEqual({
        message: 'Failed to fetch current weather.'
      })
    })
  })
}) 