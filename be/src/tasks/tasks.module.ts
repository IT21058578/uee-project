import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks.schema';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => SchedulesModule),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService, MongooseModule],
})
export class TasksModule {}
