import { ResultType } from "./result";

interface Args {
  mainDir: string;
  compareDir: Array<string>;
}

export function parseArgs(args: Array<string>): ResultType<Args> {
  if (args.length < 5) {
    return {
      error: "No arguments",
      result: null,
    };
  }

  const [, , main, ...rest] = args;

  return {
    error: null,
    result: {
      mainDir: main,
      compareDir: rest,
    },
  };
}
