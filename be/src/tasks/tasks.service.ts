import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { FlatTask, Task, TaskModel } from './tasks.schema';
import ErrorMessage from 'src/common/enums/error-message.enum';
import { CreateTaskDto } from './create-task.dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import { SortOrder } from 'mongoose';
import { PageBuilder } from 'src/common/util/page-builder';

@Injectable()
export class TasksService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @Inject(forwardRef(() => SchedulesService))
    private readonly schedulesService: SchedulesService,
    @InjectModel(Task.name) private readonly taskModel: TaskModel,
  ) {}

  async getTask(id: string) {
    const existingTask = await this.taskModel.findById(id);
    if (existingTask == null) {
      throw new BadRequestException(
        ErrorMessage.TASK_NOT_FOUND,
        `Task with id '${id}' was not found`,
      );
    }
    return existingTask;
  }

  async editTask(id: string, editTaskDto: CreateTaskDto) {
    let { date, description, duration, name, priority, assignedUserIds } =
      editTaskDto;
    name = name.trim();
    description = description.trim();

    const existingTask = await this.getTask(id);
    const tasksWithSimilarNames = await this.taskModel.find({
      roomId: existingTask.roomId,
      name: { $regex: RegExp(`^${name}`) },
    });
    if (tasksWithSimilarNames.length > 0) {
      name = `${name} #${tasksWithSimilarNames.length}`;
    }

    const allAffectedUserIds = new Set<string>();
    assignedUserIds.forEach(allAffectedUserIds.add);
    existingTask.assignedUserIds.forEach(allAffectedUserIds.add);

    existingTask.date = date ?? existingTask.date;
    existingTask.description = description;
    existingTask.duration = duration ?? existingTask.duration;
    existingTask.name = name ?? existingTask.name;
    existingTask.priority = priority ?? existingTask.priority;
    existingTask.assignedUserIds =
      assignedUserIds ?? existingTask.assignedUserIds;
    const savedTask = await existingTask.save();

    await this.schedulesService.updateRoomSchedulesOfUsers(
      existingTask.roomId,
      [...allAffectedUserIds],
    );
    return savedTask;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    let {
      date,
      description,
      duration,
      name,
      priority,
      roomId,
      assignedUserIds,
    } = createTaskDto;
    name = name.trim();
    description = description.trim();

    const tasksWithSimilarNames = await this.taskModel.find({
      roomId,
      name: { $regex: RegExp(`^${name}`) },
    });
    if (tasksWithSimilarNames.length > 0) {
      name = `${name} #${tasksWithSimilarNames.length}`;
    }

    const savedTask = await this.taskModel.create({
      date,
      description,
      duration,
      name,
      priority,
      roomId,
      assignedUserIds,
      createdAt: new Date(),
      createdBy: (this.req as any)?.user?.id,
    });

    await this.schedulesService.updateRoomSchedulesOfUsers(
      roomId,
      assignedUserIds,
    );
    return savedTask;
  }

  async deleteTask(id: string) {
    const existingTask = await this.taskModel.findByIdAndDelete(id);
    if (existingTask == null) {
      throw new BadRequestException(
        ErrorMessage.TASK_NOT_FOUND,
        `Task with id '${id}' was not found`,
      );
    }
    await this.schedulesService.updateRoomSchedulesOfUsers(
      existingTask.roomId,
      existingTask.assignedUserIds,
    );
  }

  async searchTasks({ pageNum = 1, pageSize = 10, filter, sort }: PageRequest) {
    const query = this.taskModel.find({
      ...(filter?.roomId?.value
        ? {
            roomId: filter.roomId.value,
          }
        : {}),
      ...(filter?.assignedUserIds?.value
        ? {
            assignedUserIds: { $in: [...filter.assignedUserIds.value] },
          }
        : {}),
    });
    const sortArr: [string, SortOrder][] = Object.entries(sort ?? {}).map(
      ([key, value]) => [key, value as SortOrder],
    );
    const [content, totalDocuments] = await Promise.all([
      query
        .clone()
        .sort(sortArr)
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      query.clone().count().exec(),
    ]);
    const jsonContent = content.map((doc) => doc.toJSON()) satisfies FlatTask[];
    const page = PageBuilder.buildPage(jsonContent, {
      pageNum,
      pageSize,
      totalDocuments,
      sort,
    });
    return page;
  }

  async getAllTasksByCreatedBy(userId: string) {
    return await this.taskModel.find({ createdBy: { $in: [userId] } });
  }

  async getAllTasksByIds(taskIds: string[]) {
    return await this.taskModel.find({ _id: { $in: taskIds } });
  }

  async getAllTasksByUserIds(userIds: string[]) {
    return await this.taskModel.find({ assignedUserIds: { $in: userIds } });
  }

  async deleteAllTasksFromRoom(roomId: string) {
    await this.taskModel.deleteMany({ roomId });
  }
}
