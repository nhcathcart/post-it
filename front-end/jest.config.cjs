module.exports = {
    // Other Jest configuration options...
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json', // Provide the path to your tsconfig.json
      },
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node', // You can use 'jsdom' if you're testing browser-related code
  };
  