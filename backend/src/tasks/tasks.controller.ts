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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { AuthRequest } from 'src/auth/auth-request.interface';
import { CreateTaskDto } from './dto/task-filters.dto/create-task.dto';
import { ToggleTaskDto } from './dto/task-filters.dto/toggle-task.dto';
import { UpdateTaskDto } from './dto/task-filters.dto/update-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard('jwt'))
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
  getTasks(@Req() req: AuthRequest) {
    return this.tasks.findAll(req.user.userId);
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
