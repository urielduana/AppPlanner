import { Injectable } from '@nestjs/common';
import { Task } from 'src/generated/prisma/browser';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  // Dependency injection of PrismaService
  constructor(private prisma: PrismaService) {}

  // CRUD operations for Task entity
  // READ

  // Find all tasks for a specific user
  // We cannot retrieve all tasks for all users due to privacy concerns so we filter by userId
  // Additional filters: status (completed or not), category, search (in title or description), dueDate
  findAll(
    userId: number,
    filters?: {
      status?: boolean;
      category?: string;
      search?: string;
      dueDate?: string;
    },
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
        completed: filters?.status,
        category: filters?.category,
        OR: filters?.search
          ? [
              { title: { contains: filters.search } },
              { description: { contains: filters.search } },
            ]
          : undefined,
        dueDate: filters?.dueDate
          ? {
              equals: new Date(filters.dueDate),
            }
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // CREATE

  // Create a new task for a specific user
  // The userId is required to associate the task with the user
  // The task data is provided in the data parameter
  create(userId: number, data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  //   UPDATE

  // Update an existing task by its ID
  update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  //   PATCH

  // Toggle the completion status of a task
  toggleComplete(id: number, completed: boolean): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { completed },
    });
  }

  //   DELETE

  // Delete a task by its ID
  delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
