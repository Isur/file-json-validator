/* eslint-disable no-console */
import colors from "colors";
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

console.log("Validate file structure: ");
const dirErrors = validateDirs(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);
if (dirErrors.error) {
  console.error(colors.red(dirErrors.error.details));
  process.exit(1);
}
const dirErrorsNumber = dirErrors.result.filter(
  (error) => error.errors.length > 0
).length;
const dirColors = dirErrorsNumber > 0 ? colors.red : colors.green;
console.log(dirColors(`File structure: ${dirErrorsNumber} error(s)`));
niceDisplay(dirErrors.result);

console.log("Validate jsons structure: ");
const filesErrors = validateFiles(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);

if (filesErrors.error) {
  console.error(colors.red(filesErrors.error.details));
  process.exit(1);
}

const x = filesErrors.result.filter((err) => err.errors.length > 0);
const filesErrorsNumbers = x.reduce(
  (prev, acc) => (prev += acc.errors.length),
  0
);

const fileColors = filesErrorsNumbers > 0 ? colors.red : colors.green;
console.log(fileColors(`Json files: ${filesErrorsNumbers} error(s)`));
niceDisplay(filesErrors.result);

if (dirErrors.length + filesErrors.result.length > 0) {
  process.exit(1);
}

process.exit(0);
