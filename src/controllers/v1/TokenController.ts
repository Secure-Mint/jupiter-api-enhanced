import { Controller, Inject } from "@tsed/di";
import { QueryParams, Context } from "@tsed/platform-params";
import { Get, Returns } from "@tsed/schema";
import { PaginationParams, TokenModel } from "../../models";
import { TokenService } from "../../services/TokenService";
import { SuccessResult, Pagination } from "../../models";

@Controller("/token")
export class TokenController {
  @Inject() private tokenService: TokenService;

  @Get("/list")
  @(Returns(200, SuccessResult).Of(Pagination).Nested(TokenModel))
  public async getAllTokens(@QueryParams() query: PaginationParams, @Context() ctx: Context) {
    const tokens = await this.tokenService.findPaginated(query);

    return new SuccessResult(new Pagination(tokens, 100, TokenModel), Pagination);
  }
}
