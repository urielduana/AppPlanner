import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Dependency injection of TasksService
  constructor(private tasks: TasksService) {}

  @Get()
  getTasks(@Query('userId') userId: number, @Query() filters) {
    return this.tasks.findAll(userId, filters);
  }
}
