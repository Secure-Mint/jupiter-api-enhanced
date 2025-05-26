import { Injectable } from "@tsed/di";
import { prisma } from "./PrismaService";
import { TokenListParams, TokenModel } from "../models";
import { Prisma, Token } from "generated/prisma";
import { isValidUUID } from "../utils";

@Injectable()
export class TokenService {
  public async create(token: TokenModel) {
    return prisma.token.create({
      data: { ...token, extensions: token.extensions as unknown as Prisma.JsonObject, updated_at: new Date() }
    });
  }

  public async update(token: TokenModel) {
    return prisma.token.update({
      where: { address: token.address },
      data: {
        ...token,
        extensions: token.extensions as unknown as Prisma.JsonObject,
        updated_at: token.updated_at ? new Date(token.updated_at) : new Date()
      }
    });
  }

  public async findByAddress(address: string) {
    return prisma.token.findUnique({
      where: { address }
    });
  }

  public async findPaginated({ limit, last_id }: TokenListParams) {
    console.log("is valid", isValidUUID(last_id));
    const [list, total]: [Token[], number] = await prisma.$transaction([
      isValidUUID(last_id)
        ? prisma.$queryRaw`
        SELECT *
        FROM token
        WHERE id > ${last_id}::uuid
        ORDER BY id ASC
        LIMIT ${limit}`
        : prisma.$queryRaw`
        SELECT *
        FROM token
        ORDER BY id ASC
        LIMIT ${limit}`,
      prisma.token.count()
    ]);

    return { list, total };
  }

  public async deletedExpired() {
    return prisma.$queryRaw`
      UPDATE token 
      SET deleted_at = NOW() 
      WHERE expiry < NOW()`;
  }
}
