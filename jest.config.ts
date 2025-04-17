module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['../**/*.test.ts'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
}
