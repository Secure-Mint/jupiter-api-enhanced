import { Inject, Injectable } from "@tsed/di";

import { PrismaService } from "./PrismaService.js";

@Injectable()
export class TokenService {
  @Inject() private prismaService: PrismaService;

  public async findBySymbol(symbol: string) {
    return this.prismaService.prismaClient.token.findFirst({
      where: { symbol: symbol.toUpperCase() }
    });
  }

  public async findByAddress(address: string) {
    return this.prismaService.prismaClient.token.findFirst({
      where: { address }
    });
  }
}
