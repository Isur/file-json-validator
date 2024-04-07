import { compareDirs } from "./compareDirs";

describe("compareDirs", () => {
  it("Should correctly pass", () => {
    const result = compareDirs("./public/en/", "./public/ger/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual([]);
  });

  it("Should correctly show missing file", () => {
    const result = compareDirs("./public/en/", "./public/pl/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["-buttons.json"]);
  });

  it("Should correctly show additional file", () => {
    const result = compareDirs("./public/pl/", "./public/en/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["+buttons.json"]);
  });

  it("Should correctly show error", () => {
    const result = compareDirs("./public/sl/", "./public/en/");
    expect(result.error).not.toBe(null);
  });

  it("Should correctly show error 2 ", () => {
    const result = compareDirs("./public/pl/", "./public/n/");
    expect(result.error).not.toBe(null);
  });
});
