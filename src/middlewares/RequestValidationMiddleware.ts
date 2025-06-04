import { Req } from "@tsed/platform-http";
import { Middleware } from "@tsed/platform-middlewares";

@Middleware()
export class RequestMiddleware {
  use(@Req() req: Req) {
    if (req.query.limit) {
      const rawLimit = Number(req.query.limit);
      req.query.limit = Math.min(Math.max(rawLimit, 1), 50).toString();
    }

    if (req.query.created_at === "" || req.query.created_at === null || req.query.created_at === "null") {
      req.query.created_at = "0";
    }

    if (req.query.updated_at === "" || req.query.updated_at === null || req.query.updated_at === "null") {
      req.query.updated_at = "0";
    }
  }
}
