import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  static modelName = 'Post';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
