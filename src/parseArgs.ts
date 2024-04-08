import { ResultType } from "./common";

interface Args {
  mainDir: string;
  compareDir: Array<string>;
  onlyWarn: boolean;
}

export function parseArgs(args: Array<string>): ResultType<Args> {
  if (args.length < 4) {
    return {
      error: { details: "No arguments" },
      result: null,
    };
  }

  let onlyWarn = false;

  const configArgs = args.filter((arg) => arg.startsWith("--"));
  const dirArgs = args.filter((arg) => !arg.startsWith("--"));

  if (configArgs.includes("--only-warn")) {
    onlyWarn = true;
  }

  const [, , main, ...rest] = dirArgs;

  if (rest.length < 1) {
    return {
      error: { details: "No arguments" },
      result: null,
    };
  }

  return {
    error: null,
    result: {
      mainDir: main,
      compareDir: rest,
      onlyWarn,
    },
  };
}
