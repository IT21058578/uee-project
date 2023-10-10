import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './create-room.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-roles.enum';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('users/:id')
  async getAllUserRooms(@Param('id') userId: string) {
    return await this.roomsService.getAllUserRooms(userId);
  }

  @Get(':id')
  async getRoom(@Param('id') roomId: string) {
    return await this.roomsService.getRoom(roomId);
  }

  @Post()
  @Roles(...Object.values(UserRole))
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomsService.createRoom(createRoomDto);
  }

  @Put(':id')
  @Roles(...Object.values(UserRole))
  async editRoom(
    @Body() editRoomDto: CreateRoomDto,
    @Param('id') roomId: string,
  ) {
    return await this.roomsService.editRoom(roomId, editRoomDto);
  }

  @Delete(':id')
  @Roles(...Object.values(UserRole))
  async deleteRoom(@Param('id') roomId: string) {
    return await this.roomsService.deleteRoom(roomId);
  }
}
