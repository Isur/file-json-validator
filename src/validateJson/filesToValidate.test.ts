import { filesToValidate } from "./filesToValidate";

describe("fileLoader", () => {
  it("Should find correct files to compare", () => {
    const result = filesToValidate("./public/en", [
      "./public/pl",
      "./public/ger",
    ]);

    expect(result.result?.length).toBe(3);
    expect(result.result[0]).toMatchObject({
      main: "./public/en/buttons.json",
      toCompare: "./public/ger/buttons.json",
    });
    expect(result.result[1]).toMatchObject({
      main: "./public/en/common.json",
      toCompare: "./public/pl/common.json",
    });
    expect(result.result[2]).toMatchObject({
      main: "./public/en/common.json",
      toCompare: "./public/ger/common.json",
    });
  });

  it("should handle error", () => {
    const result = filesToValidate("./public/es", [
      "./public/pl",
      "./public/ger",
    ]);

    expect(result.error).not.toBeNull();
  });

  it("should handle error 2", () => {
    const result = filesToValidate("./public/en", [
      "./public/pl",
      "./public/es",
    ]);

    expect(result.error).not.toBeNull();
  });
});
