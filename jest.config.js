module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.mock.ts",
    "!<rootDir>/src/**/*.test.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/**/*.d.ts",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
