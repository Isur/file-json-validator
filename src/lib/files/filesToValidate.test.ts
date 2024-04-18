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

  it("Should find correct files in nested directories", () => {
    const result = filesToValidate("./nested/en", [
      "./nested/pl",
      "./nested/ger",
    ]);

    expect(result.result?.length).toBe(8);
    expect(result.result![0]).toMatchObject({
      main: "./nested/en/buttons/buttons.json",
      toCompare: "./nested/pl/buttons/buttons.json",
    });
    expect(result.result![1]).toMatchObject({
      main: "./nested/en/buttons/buttons2.json",
      toCompare: "./nested/pl/buttons/buttons2.json",
    });
    expect(result.result![2]).toMatchObject({
      main: "./nested/en/pages/dashboard/title.json",
      toCompare: "./nested/pl/pages/dashboard/title.json",
    });
    expect(result.result![3]).toMatchObject({
      main: "./nested/en/pages/dashboard/title.json",
      toCompare: "./nested/ger/pages/dashboard/title.json",
    });
    expect(result.result![4]).toMatchObject({
      main: "./nested/en/pages/home/title.json",
      toCompare: "./nested/pl/pages/home/title.json",
    });
    expect(result.result![5]).toMatchObject({
      main: "./nested/en/pages/home/title.json",
      toCompare: "./nested/ger/pages/home/title.json",
    });
    expect(result.result![6]).toMatchObject({
      main: "./nested/en/titles/title.json",
      toCompare: "./nested/pl/titles/title.json",
    });
    expect(result.result![7]).toMatchObject({
      main: "./nested/en/titles/title2.json",
      toCompare: "./nested/pl/titles/title2.json",
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
