module.exports = {
  testEnvironment: '@happy-dom/jest-environment',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: { module: 'CommonJS' },
    },
  },
};