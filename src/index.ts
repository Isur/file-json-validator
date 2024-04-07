/* eslint-disable no-console */

import { niceDisplay } from "./common";
import { parseArgs } from "./parseArgs";
import { validateDirs } from "./validateDirs";
import { validateFiles } from "./validateJson";

const args = process.argv;

const appArgs = parseArgs(args);

if (appArgs.error) {
  console.error(appArgs.error);
  process.exit(1);
}

const dirErrors = validateDirs(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);

niceDisplay(dirErrors);

const filesErrors = validateFiles(
  appArgs.result.mainDir,
  appArgs.result.compareDir
);

if (filesErrors.error) {
  console.error(filesErrors);
  process.exit(1);
}

niceDisplay(filesErrors.result);

if (dirErrors.length + filesErrors.result.length > 0) {
  process.exit(1);
}

process.exit(0);
