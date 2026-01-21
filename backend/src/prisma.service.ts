import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    super({ adapter });
  }
}
/**
 * `PrismaService` extends `PrismaClient` to provide database access throughout the application.
 *
 * It is marked with `@Injectable()` so it can be injected into other classes.
 *
 */
