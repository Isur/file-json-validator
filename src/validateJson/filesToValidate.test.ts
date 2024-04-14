import { filesToValidate } from "./filesToValidate";

describe("fileLoader", () => {
  it("Should find correct files to compare", () => {
    const result = filesToValidate("./failed/en", [
      "./failed/pl",
      "./failed/ger",
    ]);

    expect(result.result?.length).toBe(3);
    expect(result.result![0]).toMatchObject({
      main: "./failed/en/buttons.json",
      toCompare: "./failed/ger/buttons.json",
    });
    expect(result.result![1]).toMatchObject({
      main: "./failed/en/common.json",
      toCompare: "./failed/pl/common.json",
    });
    expect(result.result![2]).toMatchObject({
      main: "./failed/en/common.json",
      toCompare: "./failed/ger/common.json",
    });
  });

  it("should handle error", () => {
    const result = filesToValidate("./failed/es", [
      "./failed/pl",
      "./failed/ger",
    ]);

    expect(result.error).not.toBeNull();
  });

  it("should handle error 2", () => {
    const result = filesToValidate("./failed/en", [
      "./failed/pl",
      "./failed/es",
    ]);

    expect(result.error).not.toBeNull();
  });
});
