import { Controller, Inject } from "@tsed/di";
import { QueryParams, Context, PathParams } from "@tsed/platform-params";
import { Get, Returns } from "@tsed/schema";
import { Address, TokenListParams, TokenModel } from "../../models";
import { TokenService } from "../../services/TokenService";
import { SuccessResult, PaginationKeyset } from "../../models";
import { NotFound } from "@tsed/exceptions";

@Controller("/token")
export class TokenController {
  @Inject() private tokenService: TokenService;

  @Get("/list")
  @(Returns(200, SuccessResult).Of(PaginationKeyset).Nested(TokenModel))
  public async getAllTokens(@QueryParams() query: TokenListParams, @Context() ctx: Context) {
    query.tags =
      query.tags
        ?.trim()
        .split(",")
        .filter((x) => x !== "")
        .join(",") || "";

    const { list, total } = await this.tokenService.findPaginated(query);
    const next_index = list.length ? list[list.length - 1].id : "";
    return new SuccessResult(new PaginationKeyset(TokenModel.buildArray(list), total, next_index, TokenModel), PaginationKeyset);
  }

  @Get("/:address")
  @(Returns(200, SuccessResult).Of(TokenModel))
  public async getTokenByAddress(@PathParams() { address }: Address, @Context() ctx: Context) {
    const token = await this.tokenService.findByAddress(address);
    if (!token) throw new NotFound("Address not found");
    return new SuccessResult(TokenModel.build(token), TokenModel);
  }
}
