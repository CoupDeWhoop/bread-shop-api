import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app";
const baseTestDir = "<rootDir>/__tests__";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // console info
  collectCoverage: false,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
