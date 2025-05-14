import { Inject, Injectable } from "@tsed/di";
import { prisma } from "./PrismaService";
import { PaginationParams, TokenModel } from "../models";

@Injectable()
export class TokenService {
  public async create(data: TokenModel) {
    return prisma.token.create({ data });
  }

  public async createMany(data: TokenModel[]) {
    return prisma.token.createMany({ data, skipDuplicates: true });
  }

  public async findBySymbol(symbol: string) {
    return prisma.token.findFirst({
      where: { symbol: symbol.toUpperCase() }
    });
  }

  public async findByAddress(address: string) {
    return prisma.token.findFirst({
      where: { address }
    });
  }

  public async findPaginated({ limit, next_index }: PaginationParams) {
    return prisma.token.findMany({
      take: limit,
      skip: next_index
    });
  }
}
