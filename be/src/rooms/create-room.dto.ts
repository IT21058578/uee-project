import { RoomTag } from "./room-tag.enum";

export class CreateRoomDto {
  name: string;
  description: string;
  organization: string;
  tag: RoomTag;
}
