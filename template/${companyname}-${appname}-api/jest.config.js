module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "setupFiles": [
    "./jestSetup.ts"
  ],
  "verbose": true,
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/frameworks/**/*.ts"
  ]
}