import { readFileSync } from "node:fs";

import { envs } from "./envs";
import loggerConfig from "./logger";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  ajv: {
    returnsCoercedValues: true
  },
  logger: loggerConfig
  // additional shared configuration
};
