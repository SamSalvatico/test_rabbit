module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
  },
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
