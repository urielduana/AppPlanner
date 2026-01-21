import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

/**
 * `PrismaModule` is a global module that provides and exports `PrismaService`.
 *
 * The `@Global()` decorator makes the module available everywhere in the application
 * once it's been loaded. This means you don't need to import `PrismaModule`
 * into other modules that need to use `PrismaService`.
 *
 * The `PrismaService` is responsible for interacting with the Prisma client
 * and the database. By exporting it, any module that imports `PrismaModule`
 * (or any module in the application due to `@Global()`) can inject and use
 * `PrismaService`.
 */
