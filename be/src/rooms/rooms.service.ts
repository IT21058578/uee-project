import { Inject, Injectable, Scope } from '@nestjs/common';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { FlatUser } from 'src/users/user.schema';
import { CreateRoomDto } from './create-room.dto';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RoomsService {
  constructor(@Inject(REQUEST) private readonly user: FlatUser) {}
  async getRoom(id: string) {}
  async createRoom(id: string, editRoomDto: CreateRoomDto) {}
  async editRoom(id: string, createRoomDto: CreateRoomDto) {}
  async deleteRoom(id: string) {}
  async searchRooms(pageRequest: PageRequest) {}
}
