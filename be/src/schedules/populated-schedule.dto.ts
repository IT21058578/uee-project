import { Duration } from 'dayjs/plugin/duration';
import { RoomTag } from 'src/rooms/room-tag.enum';

export class PopulatedScheduleDto {
  roomId: string;
  userId: string;
  date: Date;
  tag: RoomTag;
  totalScheduled: Duration;
  taskList: {
    taskId: string;
    taskName: string;
    startTime: Date;
    endTime: Date;
  }[];
}
