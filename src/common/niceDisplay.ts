/* eslint-disable no-console */
import { FileError } from "./fileError";

export function niceDisplay(errors: Array<FileError>) {
  for (const error of errors) {
    if (error.errors.length == 0) {
      console.log(error.path, " ==> OK");
      continue;
    } else {
      console.log(error.path);
      for (const err of error.errors) {
        console.log("\t", err);
      }
    }
  }
}
