import { Duration } from "dayjs/plugin/duration";
import { TaskPriority } from "./task-priority.enum";

export class CreateTaskDto {
  name: string;
  description: string;
  duration: Duration;
  date: Date;
  priority: TaskPriority;
  roomId: string;
  assignedUserIds: string[];
}
