import { CliCompare } from "./compare";

describe("cli compare", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("Should create compare strategy", () => {
    const compare = new CliCompare();
    expect(compare).toBeDefined();
  });

  describe("parseInput", () => {
    it("Should return error when not enough arguments", () => {
      const compare = new CliCompare();
      const result = compare.parseInput([], []);
      expect(result).toEqual("2 arguments required!");
    });

    it("Should set main and rest", () => {
      const compare = new CliCompare();
      const result = compare.parseInput(["path", "main", "x"], []);
      expect(result).toEqual("2 arguments required!");
    });

    it("Should set main and rest", () => {
      const compare = new CliCompare();
      compare.parseInput(["path", "main"], []);
      expect(compare["path"]).toEqual("path");
      expect(compare["main"]).toEqual("main");
    });

    it("Should set flags", () => {
      const compare = new CliCompare();
      compare.parseInput(
        ["path", "main"],
        ["--only-warn", "--only-structure", "--only-json"]
      );
      expect(compare["flags"]).toEqual({
        onlyWarn: true,
        onlyStructure: true,
        onlyJson: true,
      });
    });

    it("Should return error when unknown flag", () => {
      const compare = new CliCompare();
      const result = compare.parseInput(["path", "main"], ["--unknown"]);
      expect(result).toEqual("Unknown flag: --unknown");
    });
  });

  describe("should execute correctly", () => {
    it("Should work fine for correct input", () => {
      const compare = new CliCompare();
      const parseResult = compare.parseInput(["./public/locale", "en"], []);
      expect(parseResult).toBeNull();
      const result = compare.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBe(1);
    });

    it("Should work fine for correct input - nested", () => {
      const compare = new CliCompare();
      const parseResult = compare.parseInput(["./nested", "en"], []);
      expect(parseResult).toBeNull();
      const result = compare.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBe(1);
    });

    it("Should work fine for correct input -- only-warn", () => {
      const compare = new CliCompare();
      const parseResult = compare.parseInput(
        ["./public/locale", "en"],
        ["--only-warn"]
      );
      expect(parseResult).toBeNull();
      const result = compare.execute();
      expect(result.error).toBeNull();
      expect(result.result).toBe(0);
    });

    it("Should work fine for correct input -- main dir not found ", () => {
      const compare = new CliCompare();
      const parseResult = compare.parseInput(
        ["./public/local", "en"],
        ["--only-warn"]
      );
      expect(parseResult).toBeNull();
      const result = compare.execute();
      expect(result.result).toBeNull();
      expect(result.error!.details).toBeDefined();
    });

    it("Should work fine for correct input -- main json dir not found ", () => {
      const compare = new CliCompare();
      const parseResult = compare.parseInput(
        ["./public/locale", "es"],
        ["--only-warn"]
      );
      expect(parseResult).toBeNull();
      const result = compare.execute();
      expect(result.result).toBeNull();
      expect(result.error!.details).toBeDefined();
    });
  });
});
