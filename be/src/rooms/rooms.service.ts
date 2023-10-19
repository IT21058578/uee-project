import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  forwardRef,
} from '@nestjs/common';
import { CreateRoomDto } from './create-room.dto';
import { Room, RoomModel } from './rooms.schema';
import ErrorMessage from 'src/common/enums/error-message.enum';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RoomsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
    @InjectModel(Room.name) private readonly roomModel: RoomModel,
  ) {}

  async getRoom(id: string) {
    const existingRoom = await this.roomModel.findById(id);
    if (existingRoom === null) {
      throw new BadRequestException(
        ErrorMessage.ROOM_NOT_FOUND,
        `Room with id '${id}' not found`,
      );
    }
    return existingRoom;
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    let { description, name, organization, tag } = createRoomDto;
    description = description.trim();
    name = name.trim();
    organization = organization.trim();

    const createdBy: string = (this.req as any)?.user?._id;
    const savedRoom = await this.roomModel.create({
      createdAt: new Date(),
      createdBy,
      description,
      name,
      organization,
      tag,
      adminIds: [createdBy],
    });

    await this.usersService.assignToRoom(createdBy, savedRoom.id);
    return savedRoom;
  }

  async editRoom(id: string, editRoomDto: CreateRoomDto) {
    let { description, name, organization, tag } = editRoomDto;
    const updatedBy: string = (this.req as any)?.user?._id;
    const existingRoom = await this.getRoom(id);
    existingRoom.description = description ?? existingRoom.description;
    existingRoom.name = name ?? existingRoom.name;
    existingRoom.organization = organization ?? existingRoom.organization;
    existingRoom.tag = tag ?? existingRoom.tag;
    existingRoom.updatedBy = updatedBy;
    existingRoom.updatedAt = new Date();
    const savedRoom = await existingRoom.save();
    return savedRoom;
  }

  async deleteRoom(id: string) {
    const existingRoom = await this.getRoom(id);
    await this.usersService.unassignAllFromRoom(id);
    await this.tasksService.deleteAllTasksFromRoom(id);
    await existingRoom.deleteOne();
  }

  async getAllUserRooms(userId: string) {
    const existingUser = await this.usersService.getUser(userId);
    const allRooms = await this.roomModel.find({
      _id: { $in: existingUser.roomIds },
    });
    return allRooms;
  }

  async assignRoomAdmin(userId: string, roomId: string) {
    const existingRoom = await this.getRoom(roomId);
    const isAlreadyAdmin = existingRoom.adminIds.some((id) => id === userId);
    if (isAlreadyAdmin) {
      throw new BadRequestException(
        ErrorMessage.USER_ALREADY_ADMIN,
        `User with id ${userId} is already an admin of room with id '${roomId}'`,
      );
    }
  }
}
