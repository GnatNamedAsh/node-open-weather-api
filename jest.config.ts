module.exports = {
  projects: [
    {
      displayName: 'UNIT',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node',
      setupFiles: ['dotenv/config'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
      },
    },
    {
      displayName: "E2E",
      testMatch: ['<rootDir>/tests/e2e/**/*.test.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node',
      setupFiles: ['dotenv/config'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
      },
    }
  ]  
}
