import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument, Model } from 'mongoose';
import { Audit } from 'src/common/schema/audit.schema';
import { RoomTag } from './room-tag.enum';

export type FlatRoom = FlattenMaps<Room & { _id: string }>;
export type RoomModel = Model<Room>;
export type RoomDocument = HydratedDocument<Room>;

export class Room extends Audit {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  organization: string;

  @Prop({ isRequired: true, type: String, enum: Object.values(RoomTag) })
  tag: RoomTag;
}

export const RoomSchema = SchemaFactory.createForClass(Room);