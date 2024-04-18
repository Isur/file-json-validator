import { CliJson } from "./json";

describe("cli json", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("Should create json strategy", () => {
    const json = new CliJson();
    expect(json).toBeDefined();
  });

  describe("parseInput", () => {
    it("Should parse input", () => {
      const json = new CliJson();
      const args = ["main", "other", "rest"];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
    });

    it("Should parse input with flags", () => {
      const json = new CliJson();
      const args = ["main", "other", "rest"];
      const flags: Array<string> = ["--only-warn"];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
    });

    it("Should parse input with flags - failed", () => {
      const json = new CliJson();
      const args = ["main", "other", "rest"];
      const flags: Array<string> = ["--only-war"];
      const result = json.parseInput(args, flags);
      expect(result).toBe("Unknown flag: --only-war");
    });

    it("Should set flags", () => {
      const compare = new CliJson();
      compare.parseInput(
        ["path", "main"],
        ["--only-warn", "--show-only-errors"]
      );
      expect(compare["flags"]).toEqual({
        onlyWarn: true,
        showOnlyErrors: true,
      });
    });

    it("Should failed if not enough arguments", () => {
      const json = new CliJson();
      const args = ["main"];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBe(
        "Not enough arguments! At least 2 arguments are required."
      );
    });
  });

  describe("execute", () => {
    it("Should execute with 0", () => {
      const json = new CliJson();
      const args = [
        "./correct/en/common.json",
        "./correct/pl/common.json",
        "./correct/ger/common.json",
      ];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
      const execute = json.execute();
      expect(execute).toBeDefined();
      expect(execute.error).toBeNull();
      expect(execute.result).toBe(0);
    });
    it("Should execute with 1", () => {
      const json = new CliJson();
      const args = [
        "./failed/en/common.json",
        "./failed/pl/common.json",
        "./failed/ger/common.json",
      ];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
      const execute = json.execute();
      expect(execute).toBeDefined();
      expect(execute.error).toBeNull();
      expect(execute.result).toBe(1);
    });
    it("Should execute with 0 beceause of flag", () => {
      const json = new CliJson();
      const args = [
        "./failed/en/common.json",
        "./failed/pl/common.json",
        "./failed/ger/common.json",
      ];
      const flags: Array<string> = ["--only-warn"];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
      const execute = json.execute();
      expect(execute).toBeDefined();
      expect(execute.error).toBeNull();
      expect(execute.result).toBe(0);
    });

    it("should return with error - main file", () => {
      const json = new CliJson();
      const args = ["./failed/en/common.jso", "./failed/pl/common.json"];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
      const execute = json.execute();
      expect(execute).toBeDefined();
      expect(execute.error?.details).toBe("File not found!");
      expect(execute.result).toBeNull();
    });
    it("should return with error - other file", () => {
      const json = new CliJson();
      const args = ["./failed/en/common.json", "./failed/pl/common.jsn"];
      const flags: Array<string> = [];
      const result = json.parseInput(args, flags);
      expect(result).toBeNull();
      const execute = json.execute();
      expect(execute).toBeDefined();
      expect(execute.error?.details).toBe("File not found!");
      expect(execute.result).toBeNull();
    });
  });
});
