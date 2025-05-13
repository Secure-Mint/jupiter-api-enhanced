import { PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { envs } from "src/config/envs/index.js";

const { PG_HOST, PG_PORT, PG_USER, PG_DATABASE, PG_PASSWORD } = envs;

const url = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;

@Injectable()
export class PrismaService {
  public prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient({ datasources: { db: { url } } });
  }
}
