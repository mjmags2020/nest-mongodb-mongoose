import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_practice'),
    UserModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
