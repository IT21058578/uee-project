import { Controller, Get, Param, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesTransformer } from './schedules.transformer';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly schedulesTransformer: SchedulesTransformer,
  ) {}

  @Get('detailed')
  async getPopulatedRoomScheduleForUserByDay(
    @Query('user-id') userId: string,
    @Query('room-id') roomId: string,
    @Query('date') date: Date,
  ) {
    return await this.schedulesService.getPopulatedScheduleByUserAndRoom(
      userId,
      roomId,
      date,
    );
  }

  @Get('detailed/all-rooms')
  async getDetailedScheduledForUserByDay(
    @Query('user-id') userId: string,
    @Query('date') date: Date,
  ) {
    const schedules =
      await this.schedulesService.getPopulatedSchedulesByUserAndDate(
        userId,
        date,
      );
    return await this.schedulesTransformer.buildDetailedScheduleDto(
      userId,
      date,
      schedules,
    );
  }
}
