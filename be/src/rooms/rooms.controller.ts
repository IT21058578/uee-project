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
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('users/:id')
  async getAllUserRooms(@Param('id', ValidateObjectIdPipe) userId: string) {
    return await this.roomsService.getAllUserRooms(userId);
  }

  @Get(':id')
  async getRoom(@Param('id', ValidateObjectIdPipe) roomId: string) {
    return await this.roomsService.getRoom(roomId);
  }

  @Post()
  @Roles(...Object.values(UserRole))
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    const savedRoom = await this.roomsService.createRoom(createRoomDto);
    return savedRoom;
  }

  @Put(':id')
  @Roles(...Object.values(UserRole))
  async editRoom(
    @Body() editRoomDto: CreateRoomDto,
    @Param('id', ValidateObjectIdPipe) roomId: string,
  ) {
    return await this.roomsService.editRoom(roomId, editRoomDto);
  }

  @Delete(':id')
  @Roles(...Object.values(UserRole))
  async deleteRoom(@Param('id', ValidateObjectIdPipe) roomId: string) {
    return await this.roomsService.deleteRoom(roomId);
  }
}
