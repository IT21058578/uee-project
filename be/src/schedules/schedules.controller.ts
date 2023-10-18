import { Controller, Get, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesTransformer } from './schedules.transformer';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import { TransformDatePipe } from 'src/common/pipes/transform-date.pipe';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly schedulesTransformer: SchedulesTransformer,
  ) {}

  @Get('detailed')
  async getPopulatedRoomScheduleForUserByDay(
    @Query('user-id', ValidateObjectIdPipe) userId: string,
    @Query('room-id', ValidateObjectIdPipe) roomId: string,
    @Query('date', TransformDatePipe) date: Date,
  ) {
    return await this.schedulesService.getPopulatedScheduleByUserAndRoom(
      userId,
      roomId,
      date,
    );
  }

  @Get('detailed/all-rooms')
  async getDetailedScheduledForUserByDay(
    @Query('user-id', ValidateObjectIdPipe) userId: string,
    @Query('date', TransformDatePipe) date: Date,
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
