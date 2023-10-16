import { Module, forwardRef } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './rooms.schema';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => TasksModule),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService, MongooseModule],
})
export class RoomsModule {}
