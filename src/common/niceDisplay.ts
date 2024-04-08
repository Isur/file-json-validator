/* eslint-disable no-console */
import chalk from "chalk";
import { FileError } from "./fileError";

export function niceDisplay(errors: Array<FileError>) {
  for (const error of errors) {
    if (error.errors.length == 0) {
      console.log(chalk.green(`${error.path}  ==> OK`));
      continue;
    } else {
      console.log(chalk.red(error.path));
      for (const err of error.errors) {
        console.log(chalk.red(`\t ${err}`));
      }
    }
  }
}
