import { EnvConfig } from "@/config";

export function configString(config: EnvConfig): string {
  return `Config: ${config.ENV} ${config.PORT}`;
}
