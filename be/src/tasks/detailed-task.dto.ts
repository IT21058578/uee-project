import { Task } from './tasks.schema';

//DTO for detailed view task
export class DetailedTaskDto extends Task {
  _id: string;
  roomName: string;
  roomTag: string;
}
