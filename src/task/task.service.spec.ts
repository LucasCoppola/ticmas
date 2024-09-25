import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const task = service.create(createTaskDto);
      expect(task).toHaveProperty('id');
      expect(task.title).toBe(createTaskDto.title);
      expect(task.description).toBe(createTaskDto.description);
      expect(task.status).toBe('pending');
      expect(task.created_at).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return all non-deleted tasks', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      service.create(createTaskDto);
      const tasks = service.findAll();
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks.every((task) => task.status !== 'deleted')).toBeTruthy();
    });
  });

  describe('filterByStatus', () => {
    it('should return tasks filtered by status', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const task = service.create(createTaskDto);
      const filteredTasks = service.filterByStatus('pending');
      expect(filteredTasks).toContainEqual(task);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask = service.create(createTaskDto);
      const foundTask = service.findOne(createdTask.id);
      expect(foundTask).toEqual(createdTask);
    });

    it('should throw NotFoundException if task not found', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask = service.create(createTaskDto);
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
      };
      const updatedTask = service.update(createdTask.id, updateTaskDto);
      expect(updatedTask.title).toBe(updateTaskDto.title);
      expect(updatedTask.description).toBe(updateTaskDto.description);
    });
  });

  describe('remove', () => {
    it('should mark a task as deleted', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask = service.create(createTaskDto);
      const remainingTasks = service.remove(createdTask.id);
      expect(remainingTasks).not.toContainEqual(createdTask);
    });
  });

  describe('modifyStatus', () => {
    it('should modify the status of a task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask = service.create(createTaskDto);
      const updateStatusDto: UpdateStatusDto = { status: 'in_progress' };
      const updatedTask = service.modifyStatus(createdTask.id, updateStatusDto);
      expect(updatedTask.status).toBe(updateStatusDto.status);
    });
  });

  describe('getDaysSinceCreation', () => {
    it('should return the number of days since task creation', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask = service.create(createTaskDto);
      const result = service.getDaysSinceCreation(createdTask.id);
      expect(result).toHaveProperty('id', createdTask.id);
      expect(result).toHaveProperty('days');
      expect(typeof result.days).toBe('number');
    });
  });
});
