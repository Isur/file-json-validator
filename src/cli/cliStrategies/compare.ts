import { CliCommand } from "../cliCommand";
import { CliDirResult } from "./dir";
import { compareDirectoriesContent } from "@/features/compareDirectoriesContent";
import { compareJsonsInDirs } from "@/features/compareJsonsInDirs";
import { listFilesInDir } from "@/lib/files";
import { displayErrors } from "@/lib/displayErrors";

export class CliCompare implements CliCommand {
  public name = "compare";

  private flags = {
    onlyWarn: false,
    onlyStructure: false,
    onlyJson: false,
    showOnlyErrors: false,
  };

  private path: string;
  private main: string;

  public parseInput(args: Array<string>, flags: Array<string>): string | null {
    if (args.length != 2) {
      return "2 arguments required!";
    }

    this.path = args[0];
    this.main = args[1];

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

  private validateDirs(main: string, rest: Array<string>): CliDirResult {
    const dirErrors = compareDirectoriesContent(main, rest);

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

  private validateFiles(main: string, rest: Array<string>): CliDirResult {
    const filesErrors = compareJsonsInDirs(main, rest);

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

  public execute() {
    const dirs = listFilesInDir(this.path, false);

    if (dirs.error) {
      return { error: dirs.error, result: null };
    }

    if (!dirs.result.includes(this.main)) {
      return {
        error: {
          details: "Selected as main does not exists in selected directory!",
        },
        result: null,
      };
    }

    const main = `${this.path}/${this.main}`;
    const rest = dirs.result
      .filter((dir) => dir != this.main)
      .map((dir) => `${this.path}/${dir}`);

    let errorSum = 0;

    if (!this.flags.onlyJson) {
      const dirResult = this.validateDirs(main, rest);

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
      const filesResult = this.validateFiles(main, rest);

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
      error: null,
      result: exit,
    };
  }
}
