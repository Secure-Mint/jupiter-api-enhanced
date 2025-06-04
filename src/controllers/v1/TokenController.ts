import { Controller, Inject } from "@tsed/di";
import { QueryParams, Context, PathParams } from "@tsed/platform-params";
import { Get, Returns } from "@tsed/schema";
import { Address, TokenListParams, TokenModel } from "../../models";
import { TokenService } from "../../services/TokenService";
import { SuccessResult, Pagination } from "../../models";
import { NotFound } from "@tsed/exceptions";

@Controller("/token")
export class TokenController {
  @Inject() private tokenService: TokenService;

  @Get("/list")
  @(Returns(200, SuccessResult).Of(Pagination).Nested(TokenModel))
  public async getAllTokens(@QueryParams() query: TokenListParams, @Context() ctx: Context) {
    const { list, total } = await this.tokenService.findPaginated(query);
    const next_index = list[list.length - 1].id;
    return new SuccessResult(new Pagination(TokenModel.buildArray(list), total, next_index, TokenModel), Pagination);
  }

  @Get("/:address")
  @(Returns(200, SuccessResult).Of(TokenModel))
  public async getTokenByAddress(@PathParams() { address }: Address, @Context() ctx: Context) {
    const token = await this.tokenService.findByAddress(address);
    if (!token) throw new NotFound("Address not found");
    return new SuccessResult(TokenModel.build(token), TokenModel);
  }
}
