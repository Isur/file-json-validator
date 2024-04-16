import { jsonToKeys } from "./jsonToKeys";

describe("Json key strings", () => {
  it("Should correctly create array of keys from json", () => {
    const testJson = {
      hehe: "xd",
      sec: "Sec",
    };
    const result = jsonToKeys(testJson);
    expect(result).toStrictEqual(["hehe", "sec"]);
  });

  it("Should correctly create array of keys from json with nested keys", () => {
    const testJson = {
      hehe: "xd",
      sec: "Sec",
      xd: {
        hhh: "xd",
        test: {
          xddd: "ddd",
        },
      },
    };
    const result = jsonToKeys(testJson);
    expect(result).toStrictEqual([
      "hehe",
      "sec",
      "xd",
      "xd.hhh",
      "xd.test",
      "xd.test.xddd",
    ]);
  });
});
