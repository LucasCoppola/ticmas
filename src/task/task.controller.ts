import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from './task.types';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('tasks')
@UseInterceptors(TransformInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('status') status?: Status) {
    if (status) {
      return this.taskService.filterByStatus(status);
    }
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Get(':id/dias-transcurridos')
  getDaysSinceCreation(@Param('id') id: string) {
    return this.taskService.getDaysSinceCreation(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  modifyStatus(@Param('id') id: string, @Body() status: UpdateStatusDto) {
    return this.taskService.modifyStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
