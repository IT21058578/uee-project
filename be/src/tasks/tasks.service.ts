import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/common/decorators/user.decorator';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { FlatUser } from 'src/users/user.schema';

@Injectable({ scope: Scope.REQUEST })
export class TasksService {
  constructor(@Inject(REQUEST) private readonly user: FlatUser) {}
  async getTask(id: string) {}
  async createTask(id: string, editTaskDto: string) {}
  async editTask(id: string, createTaskDto: string) {}
  async deleteTask(id: string) {}
  async searchTasks(pageRequest: PageRequest) {}
}
