import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './task.types';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            filterByStatus: jest.fn(),
            findOne: jest.fn(),
            getDaysSinceCreation: jest.fn(),
            update: jest.fn(),
            modifyStatus: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
      await controller.create(createTaskDto);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return all tasks when no status is provided', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should filter tasks by status when status is provided', async () => {
      const status: Status = 'pending';
      await controller.findAll(status);
      expect(service.filterByStatus).toHaveBeenCalledWith(status);
    });
  });

  describe('findOne', () => {
    it('should find a task by id', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('getDaysSinceCreation', () => {
    it('should get days since task creation', async () => {
      const id = '1';
      await controller.getDaysSinceCreation(id);
      expect(service.getDaysSinceCreation).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const id = '1';
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      await controller.update(id, updateTaskDto);
      expect(service.update).toHaveBeenCalledWith(id, updateTaskDto);
    });
  });

  describe('modifyStatus', () => {
    it('should modify task status', async () => {
      const id = '1';
      const updateStatusDto: UpdateStatusDto = { status: 'in_progress' };
      await controller.modifyStatus(id, updateStatusDto);
      expect(service.modifyStatus).toHaveBeenCalledWith(id, updateStatusDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
