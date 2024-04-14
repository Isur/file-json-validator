import { compareDirs } from "./compareDirs";

describe("compareDirs", () => {
  it("Should correctly pass", () => {
    const result = compareDirs("./pub/en/", "./pub/ger/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual([]);
  });

  it("Should correctly show missing file", () => {
    const result = compareDirs("./pub/en/", "./pub/pl/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["-buttons.json"]);
  });

  it("Should correctly show additional file", () => {
    const result = compareDirs("./pub/pl/", "./pub/en/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["+buttons.json"]);
  });

  it("Should correctly show error", () => {
    const result = compareDirs("./pub/sl/", "./pub/en/");
    expect(result.error).not.toBe(null);
  });

  it("Should correctly show error 2 ", () => {
    const result = compareDirs("./pub/pl/", "./pub/n/");
    expect(result.error).not.toBe(null);
  });
});
