#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from "chalk";
import { niceDisplay } from "./common";
import { parseArgs } from "./parseArgs";
import { validateDirs } from "./validateDirs";
import { validateFiles } from "./validateJson";

const args = process.argv;

const appArgs = parseArgs(args);

if (appArgs.error) {
  console.error(appArgs.error.details);
  process.exit(1);
}

const exitCodeIfFailed = appArgs.result.onlyWarn ? 0 : 1;
const colorIfError = appArgs.result.onlyWarn ? chalk.yellow : chalk.red;

console.log("Validate file structure: ");
const dirErrors = validateDirs(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);
if (dirErrors.error) {
  console.error(colorIfError(dirErrors.error.details));
  process.exit(exitCodeIfFailed);
}
const dirErrorsNumber = dirErrors.result.filter(
  (error) => error.errors.length > 0
).length;
const dirColors = dirErrorsNumber > 0 ? colorIfError : chalk.green;
console.log(dirColors(`File structure: ${dirErrorsNumber} error(s)`));
niceDisplay(dirErrors.result, appArgs.result.onlyWarn);

console.log("Validate jsons structure: ");
const filesErrors = validateFiles(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);

if (filesErrors.error) {
  console.error(colorIfError(filesErrors.error.details));
  process.exit(exitCodeIfFailed);
}

const x = filesErrors.result.filter((err) => err.errors.length > 0);
const filesErrorsNumbers = x.reduce(
  (prev, acc) => (prev += acc.errors.length),
  0
);

const fileColors = filesErrorsNumbers > 0 ? colorIfError : chalk.green;
console.log(fileColors(`Json files: ${filesErrorsNumbers} error(s)`));
niceDisplay(filesErrors.result, appArgs.result.onlyWarn);

if (dirErrors.result.length + filesErrors.result.length > 0) {
  process.exit(exitCodeIfFailed);
}

process.exit(0);
