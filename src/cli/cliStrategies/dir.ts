import { CliCommand } from "../cliCommand";
import { ResultType, FileError } from "@/lib/types";
import { compareJsonsInDirs } from "@/features/compareJsonsInDirs";
import { compareDirectoriesContent } from "@/features/compareDirectoriesContent";
import { displayErrors } from "@/lib/displayErrors";

export type CliDirResult = ResultType<{
  numberOfErrors: number;
  files: Array<FileError>;
}>;

export class CliDir implements CliCommand {
  public name = "dir";

  private flags = {
    onlyWarn: false,
    onlyStructure: false,
    onlyJson: false,
    showOnlyErrors: false,
  };

  private main: string;
  private rest: Array<string>;

  public parseInput(args: Array<string>, flags: Array<string>): string | null {
    if (args.length < 2) {
      return "Not enough arguments! At least 2 arguments are required.";
    }
    const [main, ...rest] = args;

    this.main = main;
    this.rest = rest;

    for (const flag of flags) {
      if (flag === "--only-warn") {
        this.flags.onlyWarn = true;
      } else if (flag === "--only-structure") {
        this.flags.onlyStructure = true;
      } else if (flag === "--only-json") {
        this.flags.onlyJson = true;
      } else if (flag === "--show-only-errors") {
        this.flags.showOnlyErrors = true;
      } else {
        return `Unknown flag: ${flag}`;
      }
    }

    return null;
  }

  private validateDirs(): CliDirResult {
    const dirErrors = compareDirectoriesContent(this.main, this.rest);

    if (dirErrors.error) {
      return { result: null, error: dirErrors.error };
    }

    const dirErrorsNumber = dirErrors.result
      .filter((error) => error.errors.length > 0)
      .reduce((prev, acc) => prev + acc.errors.length, 0);

    return {
      result: { numberOfErrors: dirErrorsNumber, files: dirErrors.result },
      error: null,
    };
  }

  private validateFiles(): CliDirResult {
    const filesErrors = compareJsonsInDirs(this.main, this.rest);

    if (filesErrors.error) {
      return {
        result: null,
        error: filesErrors.error,
      };
    }

    const filesErrorsNumbers = filesErrors.result
      .filter((err) => err.errors.length > 0)
      .reduce((prev, acc) => (prev += acc.errors.length), 0);

    return {
      result: {
        numberOfErrors: filesErrorsNumbers,
        files: filesErrors.result,
      },
      error: null,
    };
  }

  public execute(): ResultType<number> {
    let errorSum = 0;

    if (!this.flags.onlyJson) {
      const dirResult = this.validateDirs();

      if (dirResult.error) {
        return {
          error: dirResult.error,
          result: null,
        };
      }
      errorSum += dirResult.result.numberOfErrors;
      displayErrors(
        dirResult.result.files,
        this.flags.onlyWarn,
        `Directory structure: (${dirResult.result.numberOfErrors} errors)`,
        this.flags.showOnlyErrors
      );
    }

    if (!this.flags.onlyStructure) {
      const filesResult = this.validateFiles();

      if (filesResult.error) {
        return {
          error: filesResult.error,
          result: null,
        };
      }

      errorSum += filesResult.result.numberOfErrors;
      displayErrors(
        filesResult.result.files,
        this.flags.onlyWarn,
        `Json content: (${filesResult.result.numberOfErrors} errors)`,
        this.flags.showOnlyErrors
      );
    }

    const exitCode = errorSum > 0 ? 1 : 0;
    const exit = this.flags.onlyWarn ? 0 : exitCode;
    return {
      result: exit,
      error: null,
    };
  }
}
