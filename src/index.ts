/* eslint-disable no-console */
import { Config } from "./config";
import { configString } from "./configString";

function bootstrap() {
  console.log(configString(Config));
}

bootstrap();
