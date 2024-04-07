/* eslint-disable no-console */

import { parseArgs } from "./parseArgs";

const args = process.argv;

const appArgs = parseArgs(args);

console.log(appArgs);
