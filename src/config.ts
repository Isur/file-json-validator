import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { z } from "zod";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const envSchema = z.object({
  ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.preprocess((val) => Number(val), z.number()).default(3000),
});

export type EnvConfig = z.infer<typeof envSchema>;

function getConfig(): EnvConfig {
  const config = envSchema.safeParse(process.env);

  if (!config.success) {
    throw new Error(config.error.message);
  }

  return config.data;
}

export const Config = getConfig();
