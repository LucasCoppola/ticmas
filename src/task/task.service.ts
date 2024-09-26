import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as crypto from 'node:crypto';
import { Status, Task } from './task.types';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'pending',
      created_at: new Date(),
    };

    this.tasks.push(newTask);

    return newTask;
  }

  findAll(): Task[] {
    return this.tasks.filter((task) => task.status !== 'deleted');
  }

  filterByStatus(status: Status): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  findOne(id: string): Task {
    const task = this.tasks.find(
      (task) => task.id === id && task.status !== 'deleted',
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description } = updateTaskDto;

    const task = this.findOne(id);

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    return task;
  }

  remove(id: string): Task[] {
    const task = this.findOne(id);
    task.status = 'deleted';

    return this.findAll();
  }

  modifyStatus(id: string, updateStatusDto: UpdateStatusDto): Task {
    const { status } = updateStatusDto;
    const task = this.findOne(id);
    task.status = status as Status;

    return task;
  }

  getDaysSinceCreation(id: string) {
    const task = this.findOne(id);
    const today = new Date();

    const diffTime = Math.abs(today.getTime() - task.created_at.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return { id: task.id, days: diffDays };
  }
}
