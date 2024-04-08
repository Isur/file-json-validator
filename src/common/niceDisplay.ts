/* eslint-disable no-console */
import chalk from "chalk";
import { FileError } from "./fileError";

export function niceDisplay(errors: Array<FileError>, onlyWarn: boolean) {
  const colorIfError = onlyWarn ? chalk.yellow : chalk.red;
  for (const error of errors) {
    if (error.errors.length == 0) {
      console.log(chalk.green(`${error.path}  ==> OK`));
      continue;
    } else {
      console.log(colorIfError(error.path));
      for (const err of error.errors) {
        console.log(colorIfError(`\t ${err}`));
      }
    }
  }
}
