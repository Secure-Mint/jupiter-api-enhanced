import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/token")
export class TokenController {
  @Get("/list")
  get() {
    return "I will return list of tokens updated!";
  }
}
