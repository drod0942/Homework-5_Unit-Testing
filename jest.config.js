/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // ... other configurations ...
  
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
  
    // Add a transform property to use babel-jest
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
    },
  
    // Adjust transformIgnorePatterns to transpile axios
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)"
    ],
  
    // ... any other configurations ...
  };
  
  module.exports = config;