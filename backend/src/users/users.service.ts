import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  // Dependency injection of PrismaService
  constructor(private prisma: PrismaService) {}

  // CRUD operations for User entity
  // READ
  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  // CREATE
  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}

/**
 * `UsersService` provides CRUD operations for managing users.
 * It uses `PrismaService` to interact with the database.
 * The service includes methods to find users by ID or email and to create new users.
 * This service is essential for user management within the application.
 */
