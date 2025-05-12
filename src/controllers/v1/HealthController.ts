import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/health")
export class HealthController {
  @Get("/")
  get() {
    return "I am alive and well!";
  }
}
