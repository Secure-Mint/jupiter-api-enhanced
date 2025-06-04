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

  public async findPaginated({ limit, next_index, tags, created_at, updated_at }: TokenListParams) {
    let whereClauses: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;
    const isUUID = isValidUUID(next_index);

    if (isUUID) {
      whereClauses.push(`id > $${paramIndex++}::uuid`);
      params.push(next_index);
    }

    if (created_at) {
      whereClauses.push(`created_at > $${paramIndex++}`);
      params.push(new Date(created_at));
    }

    if (updated_at) {
      whereClauses.push(`updated_at > $${paramIndex++}`);
      params.push(new Date(updated_at));
    }

    if (tags) {
      console.log("attached tags...");
      whereClauses.push(`tags && ARRAY[$${paramIndex++}]`);
      params.push(tags);
    }

    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const listSQL = `
      SELECT * FROM token
      ${whereSQL}
      ORDER BY id ASC
      LIMIT $${paramIndex}
    `;
    params.push(limit);

    const countSQL = `
      SELECT COUNT(*)::int AS count
      FROM token
      ${whereSQL}
    `;

    const [list, countResult] = await Promise.all([
      prisma.$queryRawUnsafe<Token[]>(listSQL, ...params),
      prisma.$queryRawUnsafe<{ count: number }[]>(countSQL, ...params.slice(0, paramIndex - 1))
    ]);

    return {
      list,
      total: countResult[0]?.count ?? 0
    };
  }

  public async deletedExpired() {
    return prisma.$queryRaw`
      UPDATE token 
      SET deleted_at = NOW() 
      WHERE expiry < NOW()`;
  }
}
