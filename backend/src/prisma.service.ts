import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // Prisma 7 no reads the datasource URL from schema anymore.
      // We must explicitly provide the SQLite connection via the adapter.
      adapter: new PrismaBetterSqlite3({
        // Local SQLite database for development
        url: 'file:./dev.db',
      }),
    });
  }

  async onModuleInit() {
    // Ensure Prisma establishes the database connection
    // when the NestJS module is initialized
    await this.$connect();
  }
}

// Prisma 7 changed how SQLite connections work.
// The adapter needs the database URL directly, otherwise it crashes.
