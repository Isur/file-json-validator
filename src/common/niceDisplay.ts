/* eslint-disable no-console */
import colors from "colors";
import { FileError } from "./fileError";

export function niceDisplay(errors: Array<FileError>) {
  for (const error of errors) {
    if (error.errors.length == 0) {
      console.log(colors.green(`${error.path}  ==> OK`));
      continue;
    } else {
      console.log(colors.red(error.path));
      for (const err of error.errors) {
        console.log(colors.red(`\t ${err}`));
      }
    }
  }
}
