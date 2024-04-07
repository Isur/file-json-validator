import { compareArrays } from "./compareArrays";

describe("Compare file list", () => {
  it("should return empty if lists are the same", () => {
    const diff = compareArrays(
      ["hehe", "hehe2", "hehe3"],
      ["hehe", "hehe2", "hehe3"]
    );

    expect(diff.length).toBe(0);
  });

  it("should return items if there is missing item", () => {
    const diff = compareArrays(["hehe", "hehe2", "hehe3"], ["hehe", "hehe2"]);

    expect(diff.length).toBe(1);
    expect(diff[0]).toBe("-hehe3");
  });

  it("should return items if there is more items", () => {
    const diff = compareArrays(
      ["hehe", "hehe2", "hehe3"],
      ["hehe", "hehe2", "hehe3", "hehe4"]
    );

    expect(diff.length).toBe(1);
    expect(diff[0]).toBe("+hehe4");
  });

  it("should return items if there is missing and additional", () => {
    const diff = compareArrays(
      ["hehe", "hehe2", "hehe3"],
      ["hehe", "hehe3", "hehe4"]
    );

    expect(diff.length).toBe(2);
    expect(diff[0]).toBe("-hehe2");
    expect(diff[1]).toBe("+hehe4");
  });
});
