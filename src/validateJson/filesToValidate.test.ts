import { filesToValidate } from "./filesToValidate";

describe("fileLoader", () => {
  it("Should find correct files to compare", () => {
    const result = filesToValidate("./pub/en", ["./pub/pl", "./pub/ger"]);

    expect(result.result?.length).toBe(3);
    expect(result.result![0]).toMatchObject({
      main: "./pub/en/buttons.json",
      toCompare: "./pub/ger/buttons.json",
    });
    expect(result.result![1]).toMatchObject({
      main: "./pub/en/common.json",
      toCompare: "./pub/pl/common.json",
    });
    expect(result.result![2]).toMatchObject({
      main: "./pub/en/common.json",
      toCompare: "./pub/ger/common.json",
    });
  });

  it("should handle error", () => {
    const result = filesToValidate("./pub/es", ["./pub/pl", "./pub/ger"]);

    expect(result.error).not.toBeNull();
  });

  it("should handle error 2", () => {
    const result = filesToValidate("./pub/en", ["./pub/pl", "./pub/es"]);

    expect(result.error).not.toBeNull();
  });
});
