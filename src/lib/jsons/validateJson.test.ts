import { validateJson } from "./validateJson";

describe("Json Diff", () => {
  it("Should compare if json has the same structure", () => {
    const testJson = {
      hehe: "xd",
      sec: "Sec",
    };
    const testJson2 = {
      hehe: "xd",
      sec: "Sec",
    };

    const diff = validateJson(testJson, testJson2);
    expect(diff.result).toStrictEqual([]);
  });

  it("Should compare and show missing and additional keys", () => {
    const testJson = {
      hehe: "xd",
      sec: "Sec",
    };
    const testJson2 = {
      sec: "Sec",
      xd: "xd",
    };

    const diff = validateJson(testJson, testJson2);
    expect(diff.result).toStrictEqual(["-hehe", "+xd"]);
  });

  it("Should compare and show missing and additional keys nested", () => {
    const testJson = {
      hehe: "xd",
      sec: "Sec",
      hehehe: {
        xd: "mis",
        hehe: "xdd",
      },
    };
    const testJson2 = {
      hehe: "xd",
      sec: "Sec",
      hehehe: {
        hehe: "xdd",
      },
    };

    const diff = validateJson(testJson, testJson2);
    expect(diff.result).toStrictEqual(["-hehehe.xd"]);
  });
});
