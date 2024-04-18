import { CliDir } from "./dir";

describe("cli dir", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("Should create dir strategy", () => {
    const dir = new CliDir();
    expect(dir).toBeDefined();
  });

  describe("parseInput", () => {
    it("Should return error when not enough arguments", () => {
      const dir = new CliDir();
      const result = dir.parseInput([], []);
      expect(result).toEqual(
        "Not enough arguments! At least 2 arguments are required."
      );
    });

    it("Should set main and rest", () => {
      const dir = new CliDir();
      dir.parseInput(["main", "rest", "x"], []);
      expect(dir["main"]).toEqual("main");
      expect(dir["rest"]).toEqual(["rest", "x"]);
    });

    it("Should set flags", () => {
      const dir = new CliDir();
      dir.parseInput(
        ["main", "rest"],
        ["--only-warn", "--only-structure", "--only-json", "--show-only-errors"]
      );
      expect(dir["flags"]).toEqual({
        onlyWarn: true,
        onlyStructure: true,
        onlyJson: true,
        showOnlyErrors: true,
      });
    });

    it("Should return error when unknown flag", () => {
      const dir = new CliDir();
      const result = dir.parseInput(["main", "rest"], ["--unknown"]);
      expect(result).toEqual("Unknown flag: --unknown");
    });
  });

  describe("execute", () => {
    it("Should fail if dir not found", () => {
      const dir = new CliDir();
      dir.parseInput(["not-found", "somehting", "else"], []);
      const result = dir.execute();
      expect(result.error).not.toBeNull();
      expect(result.error?.details).toBeDefined();
    });
    it("Should fail if file not found", () => {
      const dir = new CliDir();
      dir.parseInput(["not-found", "somehting", "else"], ["--only-json"]);
      const result = dir.execute();
      expect(result.error).not.toBeNull();
      expect(result.error?.details).toBeDefined();
    });

    it("should correctly validate dirs", () => {
      const dir = new CliDir();
      dir.parseInput(["./correct/en", "./correct/pl", "./correct/ger"], []);
      const result = dir.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBeDefined();
      expect(result.result).toBe(0);
    });

    it("should correctly validate dirs - with errors", () => {
      const dir = new CliDir();
      dir.parseInput(["./failed/en", "./failed/pl", "./failed/ger"], []);
      const result = dir.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBeDefined();
      expect(result.result).toBe(1);
    });

    it("should correctly validate files", () => {
      const dir = new CliDir();
      // @ts-expect-error - private method
      const s = jest.spyOn(dir, "validateFiles");
      // @ts-expect-error - private method
      const s2 = jest.spyOn(dir, "validateDirs");
      dir.parseInput(
        ["./correct/en", "./correct/pl", "./correct/ger"],
        ["--only-json"]
      );
      const result = dir.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBeDefined();
      expect(result.result).toBe(0);
      expect(s).toHaveBeenCalledTimes(1);
      expect(s2).toHaveBeenCalledTimes(0);
    });

    it("should correctly validate dirs", () => {
      const dir = new CliDir();
      // @ts-expect-error - private method
      const s = jest.spyOn(dir, "validateFiles");
      // @ts-expect-error - private method
      const s2 = jest.spyOn(dir, "validateDirs");
      dir.parseInput(
        ["./correct/en", "./correct/pl", "./correct/ger"],
        ["--only-structure"]
      );
      const result = dir.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBeDefined();
      expect(result.result).toBe(0);
      expect(s).toHaveBeenCalledTimes(0);
      expect(s2).toHaveBeenCalledTimes(1);
    });

    it("should only warn", () => {
      const dir = new CliDir();
      dir.parseInput(
        ["./failed/en", "./failed/pl", "./failed/ger"],
        ["--only-warn"]
      );
      const result = dir.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBeDefined();
      expect(result.result).toBe(0);
    });
  });
});
