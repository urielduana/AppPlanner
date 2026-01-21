import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, UsersModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

/**
 * `AppModule` is the root module of the application.
 * It imports other modules, defines controllers, and sets up providers.
 *
 * The `imports` array includes:
 * - `PrismaModule`: Provides and exports `PrismaService` for database interactions.
 * - `UsersModule`: Manages user-related functionalities.
 *
 */
