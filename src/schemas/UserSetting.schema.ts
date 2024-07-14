import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class UserSettings {
  static modelName = 'UserSettings';

  @Prop({ isRequired: false })
  receiveNotifications?: boolean;

  @Prop({ isRequired: false })
  receiveEmails?: boolean;

  @Prop({ isRequired: false })
  receiveSms?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
