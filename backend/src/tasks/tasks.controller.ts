import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskFiltersDto } from './dto/task-filters.dto/task-filters.dto';
import { CreateTaskDto } from './dto/task-filters.dto/create-task.dto';
import { UpdateTaskDto } from './dto/task-filters.dto/update-task.dto';
import { ToggleTaskDto } from './dto/task-filters.dto/toggle-task.dto';

@Controller('tasks')
export class TasksController {
  // Dependency injection of TasksService
  constructor(private tasks: TasksService) {}

  //   CREATE
  @Post()
  createTask(
    @Query('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasks.create(userId, dto);
  }

  //   READ
  @Get()
  getTasks(
    @Query('userId', ParseIntPipe) userId: number,
    @Query() filters: TaskFiltersDto,
  ) {
    return this.tasks.findAll(userId, filters);
  }

  //   UPDATE
  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(id, dto);
  }

  //   PATCH
  @Patch(':id/complete')
  // If API toggles fails probaly is missing @Body('completed') completed: boolean
  toggle(@Param('id', ParseIntPipe) id: number, @Body() dto: ToggleTaskDto) {
    return this.tasks.toggleComplete(id, dto.completed);
  }

  //   DELETE
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasks.delete(id);
  }
}

/**
 * `TasksController` handles HTTP requests for task management, providing endpoints
 * for creating, reading, updating, toggling completion, and deleting tasks.
 * It uses `TasksService` to perform the underlying operations.
 * */
