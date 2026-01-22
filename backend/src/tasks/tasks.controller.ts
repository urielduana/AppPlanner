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

  //   CREATE - AUTHENTICATED
  @Post()
  createTask(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.tasks.create(req.user.userId, dto);
  }

  //   READ - AUTHENTICATED
  @Get()
  getTasks(@Req() req: AuthRequest, @Query() filters: any) {
    return this.tasks.findAll(req.user.userId, filters);
  }

  //   UPDATE - AUTHENTICATED
  @Put(':id')
  updateTask(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(req.user.userId, id, dto);
  }

  //   PATCH - AUTHENTICATED
  @Patch(':id/complete')
  toggle(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ToggleTaskDto,
  ) {
    return this.tasks.toggleComplete(req.user.userId, id, dto.completed);
  }

  //   DELETE
  @Delete(':id')
  deleteTask(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.tasks.delete(req.user.userId, id);
  }
}

/**
 * `TasksController` handles HTTP requests for task management, providing endpoints
 * for creating, reading, updating, toggling completion, and deleting tasks.
 * It uses `TasksService` to perform the underlying operations.
 * */
