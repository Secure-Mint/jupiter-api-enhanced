import "@tsed/platform-log-request"; // remove this import if you don&#x27;t want log request
import "@tsed/platform-express";
import "@tsed/ajv";
import "@tsed/swagger";

import { join } from "node:path";

import { Configuration } from "@tsed/di";
import { application } from "@tsed/platform-http";

import { config } from "./config/index";
import * as v1 from "./controllers/v1/index";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 4001,
  httpsPort: false, // CHANGE
  mount: {
    "/v1": [...Object.values(v1)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } }
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  }
})
export class Server {
  protected app = application();
}
