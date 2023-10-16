import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  forwardRef,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleModel } from './schedules.schema';
import ErrorMessage from 'src/common/enums/error-message.enum';
import { TasksService } from 'src/tasks/tasks.service';
import { PopulatedScheduleDto } from './populated-schedule.dto';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TaskDocument } from 'src/tasks/tasks.schema';
import { TaskPriority } from 'src/tasks/task-priority.enum';
import { RoomsService } from 'src/rooms/rooms.service';
import { Request } from 'express';
dayjs?.extend(duration);

@Injectable({ scope: Scope.REQUEST })
export class SchedulesService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @Inject(forwardRef(() => TasksService))
    private readonly taskService: TasksService,
    @Inject(forwardRef(() => RoomsService))
    private readonly roomsService: RoomsService,
    @InjectModel(Schedule.name) private readonly scheduleModel: ScheduleModel,
  ) {}

  async getScheduleByUserAndRoomAndDate(
    userId: string,
    roomId: string,
    date: Date,
  ) {
    const existingSchedule = await this.scheduleModel.findOne({
      userId,
      roomId,
      date,
    });
    if (existingSchedule === null) {
      throw new BadRequestException(
        ErrorMessage.SCHEDULE_NOT_FOUND,
        `User with id '${userId}' does not have a schedule in room with id '${roomId}'`,
      );
    }
    return existingSchedule;
  }

  async getPopulatedSchedulesByUserAndDate(userId: string, date: Date) {
    const [allSchedules, allRooms] = await Promise.all([
      this.scheduleModel.find({ userId, date }),
      this.roomsService.getAllUserRooms(userId),
    ]);
    const allTaskIds = allSchedules.reduce((a, b) => {
      const taskIds = b.taskList.map((task) => task.taskId);
      return [...a, ...taskIds];
    }, []);
    const allTasks = await this.taskService.getAllTasksByIds(allTaskIds);

    const populatedSchedulePromises = allSchedules.map(async (schedule) => {
      const relevantRoom = allRooms.find((room) => room.id === schedule.roomId);
      const totalScheduledInMs = schedule.taskList.reduce((a, b) => {
        const diffInMs = dayjs(b.endTime).diff(dayjs(b.startTime));
        return a + diffInMs;
      }, 0);

      return {
        roomId: schedule.roomId,
        userId,
        tag: relevantRoom?.tag!,
        date,
        totalScheduled: dayjs.duration(totalScheduledInMs, 'ms'),
        taskList: schedule.taskList.map((item) => {
          const task = allTasks.find((o) => o.id === item.taskId);
          return { ...item, taskName: task?.name ?? '' };
        }),
      } satisfies PopulatedScheduleDto;
    });

    return await Promise.all(populatedSchedulePromises);
  }

  async getPopulatedScheduleByUserAndRoom(
    userId: string,
    roomId: string,
    date: Date,
  ) {
    const [existingRoom, existingSchedule] = await Promise.all([
      this.roomsService.getRoom(roomId),
      this.getScheduleByUserAndRoomAndDate(userId, roomId, date),
    ]);
    const allTaskIds = existingSchedule.taskList.map((item) => item.taskId);
    const allTasks = await this.taskService.getAllTasksByIds(allTaskIds);
    const totalScheduledInMs = existingSchedule.taskList.reduce((a, b) => {
      const diffInMs = dayjs(b.endTime).diff(dayjs(b.startTime));
      return a + diffInMs;
    }, 0);

    const populatedSchedule: PopulatedScheduleDto = {
      roomId,
      userId,
      tag: existingRoom.tag,
      date: existingSchedule.date,
      totalScheduled: dayjs.duration(totalScheduledInMs, 'ms'),
      taskList: existingSchedule.taskList.map((item) => {
        const task = allTasks.find((o) => o.id === item.taskId);
        return { ...item, taskName: task?.name ?? '' };
      }),
    };

    return populatedSchedule;
  }

  async updateRoomSchedulesOfUsers(roomId: string, userIds: string[]) {
    const allExistingSchedules = await this.scheduleModel.find({
      roomId,
      userId: { $in: userIds },
    });
    const allTasks = await this.taskService.getAllTasksByUserIds(userIds);

    userIds.forEach(async (userId) => {
      const assignedTasks = allTasks.filter((task) =>
        task.assignedUserIds.includes(userId),
      );
      const assignedDates = [
        ...new Set(assignedTasks.map((task) => task.date)),
      ];
      assignedDates.forEach(async (date) => {
        const tasksForDate = assignedTasks.filter((task) => task.date === date);
        const taskList = this.buildScheduleTaskList(date, tasksForDate);
        const existingSchedule = allExistingSchedules.find((schedule) => {
          const isSameUser = schedule.userId === userId;
          const isSameDate = schedule.date === date;
          return isSameUser && isSameDate;
        });

        if (taskList.length === 0) {
          await existingSchedule?.deleteOne();
          return;
        }

        if (existingSchedule) {
          existingSchedule.taskList = taskList;
          existingSchedule.updatedAt = new Date();
          existingSchedule.updatedBy = (this.req as any)?.user?._id;
          await existingSchedule.save();
          return;
        }

        await this.scheduleModel.create({
          createdAt: new Date(),
          createdBy: (this.req as any)?.user?._id,
          date,
          roomId,
          taskList,
          userId,
        });
      });
    });
  }

  private buildScheduleTaskList(
    date: Date,
    assignedTasks: TaskDocument[],
  ): Schedule['taskList'] {
    const priorityValue = Object.values(TaskPriority);
    const orderedTasks = assignedTasks.sort(
      (a, b) =>
        priorityValue.indexOf(a.priority) - priorityValue.indexOf(b.priority),
    );

    // Date must be midnight of the considered day.
    let lastTaskEndTime = dayjs(date);
    const taskList: Schedule['taskList'] = orderedTasks.map((task) => {
      const startTime = lastTaskEndTime;
      const endTime = startTime.add(task.duration);
      lastTaskEndTime = endTime;
      return {
        endTime: endTime.toDate(),
        startTime: startTime.toDate(),
        taskId: task.id,
        taskName: task.name,
      };
    });

    return taskList;
  }
}