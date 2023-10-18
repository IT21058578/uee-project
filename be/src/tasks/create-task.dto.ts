import { Duration } from 'dayjs/plugin/duration';
import { TaskPriority } from './task-priority.enum';
import {
  IsArray,
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsObject()
  @IsNotEmpty()
  duration: Duration;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsDate()
  @IsIn(Object.values(TaskPriority))
  priority: TaskPriority;

  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  assignedUserIds: string[];
}
