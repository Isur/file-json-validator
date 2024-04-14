import { CliCommand } from "../cliCommand";
import { CliDirResult } from "./dir";
import { openDir, validateDirs } from "@/validateDirs";
import { validateFiles } from "@/validateJson";
import { niceDisplay } from "@/common";

export class CliCompare implements CliCommand {
  public name = "compare";

  private flags = {
    onlyWarn: false,
    onlyStructure: false,
    onlyJson: false,
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
      } else {
        return `Unknown flag: ${flag}`;
      }
    }

    return null;
  }

  private validateDirs(main: string, rest: Array<string>): CliDirResult {
    const dirErrors = validateDirs(main, rest);

    if (dirErrors.error) {
      return { result: null, error: dirErrors.error };
    }

    const dirErrorsNumber = dirErrors.result.filter(
      (error) => error.errors.length > 0
    ).length;

    return {
      result: { numberOfErrors: dirErrorsNumber, files: dirErrors.result },
      error: null,
    };
  }

  private validateFiles(main: string, rest: Array<string>): CliDirResult {
    const filesErrors = validateFiles(main, rest);

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
    const dirs = openDir(this.path);

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
      niceDisplay(dirResult.result.files, this.flags.onlyWarn);
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
      niceDisplay(filesResult.result.files, this.flags.onlyWarn);
    }

    const exitCode = errorSum > 0 ? 1 : 0;
    const exit = this.flags.onlyWarn ? 0 : exitCode;
    return {
      error: null,
      result: exit,
    };
  }
}
