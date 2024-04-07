import { configString } from "./configString";
import { EnvConfig } from "@/config";

describe("showConfig", () => {
  it("should return the config", () => {
    const config: EnvConfig = {
      ENV: "development",
      PORT: 3000,
    };

    expect(configString(config)).toEqual("Config: development 3000");
  });
});
