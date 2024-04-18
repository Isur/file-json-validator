/* eslint-disable no-console */
import chalk from "chalk";
import { FileError } from "@/lib/types/fileError";

export function displayErrors(
  errors: Array<FileError>,
  onlyWarn: boolean,
  title?: string
) {
  const colorIfError = onlyWarn ? chalk.yellow : chalk.red;

  if (title) {
    console.log(title);
  }

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
