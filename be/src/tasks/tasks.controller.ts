import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { CreateTaskDto } from './create-task.dto';
import { UserRole } from 'src/common/enums/user-roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('search')
  async searchTasks(@Body() pageRequest: PageRequest) {
    return this.tasksService.searchTasks(pageRequest);
  }

  @Get(':id')
  async getTask(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.tasksService.getTask(id);
  }

  @Put(':id')
  @Roles(...Object.values(UserRole))
  async editTask(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() editTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.editTask(id, editTaskDto);
  }

  @Delete(':id')
  @Roles(...Object.values(UserRole))
  async deleteTask(@Param('id', ValidateObjectIdPipe) id: string) {
    await this.tasksService.deleteTask(id);
  }

  @Post()
  @Roles(...Object.values(UserRole))
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
