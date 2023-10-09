export class CreateTaskDto {
  name: string;
  description: string;
  duration: string;
  priority: string;
  roomId: string;
  assignedUserIds: string[];
}
