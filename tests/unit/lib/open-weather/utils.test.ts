import { determineWeatherCondition, getQualitativeTemp } from '@/lib/open-weather'
import { describe, it, expect } from '@jest/globals'


describe('Open Weather Utils', () => {
  describe('getQualitativeTemp', () => {
    it('should return cold if temp is <= 55', () => {})
    it('should return hot if temp is >= 85', () => {})
    
    // technically for this one, we should be throwing the whole range at it
    // to make sure it works as expected, but I'll do that later if I have time
    it('should return moderate if 55 < temp < 85', () => {})
  })

  // We should technically be testing all values in range here, but I'll just
  // test one or two near the extremes instead.
  describe('determineWeatherCondition', () => {
    it('should return thunderstorms for 200 <= id <= 232', () => {})
    it('should return drizzle for 300 <= id <= 321', () => {})
    it('should return rain for 500 <= id <= 531', () => {})
    it('should return snow for 600 <= id <= 622', () => {})
    it('should return cloudy for 801 <= id <= 804', () => {})
    it('should return clear for any other value', () => {})
  })
})
