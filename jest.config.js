const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverage: true,
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.mock.ts",
    "!<rootDir>/src/**/*.test.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/**/*.d.ts",
  ],
};
