import { determineWeatherCondition, getQualitativeTemp } from '@/src/lib/open-weather'


describe('Open Weather Utils', () => {
  describe('getQualitativeTemp', () => {
    it('should return cold if temp is <= 55', () => {
      expect(getQualitativeTemp(55)).toBe('cold')
      expect(getQualitativeTemp(0)).toBe('cold')
      expect(getQualitativeTemp(-10)).toBe('cold')
    })

    it('should return hot if temp is >= 85', () => {
      expect(getQualitativeTemp(85)).toBe('hot')
      expect(getQualitativeTemp(90)).toBe('hot')
      expect(getQualitativeTemp(100)).toBe('hot')
    })
    
    it('should return moderate if 55 < temp < 85', () => {
      expect(getQualitativeTemp(56)).toBe('moderate')
      expect(getQualitativeTemp(70)).toBe('moderate')
      expect(getQualitativeTemp(84)).toBe('moderate')
    })
  })

  describe('determineWeatherCondition', () => {
    const createWeatherObject = (id: number) => ({
      id,
      main: 'Test',
      description: 'Test description',
      icon: '01d'
    })

    it('should return thunderstorms for 200 <= id <= 232', () => {
      expect(determineWeatherCondition(createWeatherObject(200))).toBe('thunderstorms')
      expect(determineWeatherCondition(createWeatherObject(216))).toBe('thunderstorms')
      expect(determineWeatherCondition(createWeatherObject(232))).toBe('thunderstorms')
    })

    it('should return drizzle for 300 <= id <= 321', () => {
      expect(determineWeatherCondition(createWeatherObject(300))).toBe('drizzle')
      expect(determineWeatherCondition(createWeatherObject(310))).toBe('drizzle')
      expect(determineWeatherCondition(createWeatherObject(321))).toBe('drizzle')
    })

    it('should return rain for 500 <= id <= 531', () => {
      expect(determineWeatherCondition(createWeatherObject(500))).toBe('rain')
      expect(determineWeatherCondition(createWeatherObject(515))).toBe('rain')
      expect(determineWeatherCondition(createWeatherObject(531))).toBe('rain')
    })

    it('should return snow for 600 <= id <= 622', () => {
      expect(determineWeatherCondition(createWeatherObject(600))).toBe('snow')
      expect(determineWeatherCondition(createWeatherObject(611))).toBe('snow')
      expect(determineWeatherCondition(createWeatherObject(622))).toBe('snow')
    })

    it('should return cloudy for 801 <= id <= 804', () => {
      expect(determineWeatherCondition(createWeatherObject(801))).toBe('cloudy')
      expect(determineWeatherCondition(createWeatherObject(802))).toBe('cloudy')
      expect(determineWeatherCondition(createWeatherObject(804))).toBe('cloudy')
    })

    it('should return clear for any other value', () => {
      expect(determineWeatherCondition(createWeatherObject(800))).toBe('clear')
      expect(determineWeatherCondition(createWeatherObject(0))).toBe('clear')
      expect(determineWeatherCondition(createWeatherObject(999))).toBe('clear')
    })
  })
})
