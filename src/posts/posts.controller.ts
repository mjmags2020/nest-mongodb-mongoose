import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostsService } from './posts.service';
import mongoose, { Mongoose } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  async findPostById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);

    const user = await this.postsService.findPostById(id);
    if (!user) throw new HttpException('User not found', 404);

    return user;
  }
  @Delete(':userId/:id')
  deletePost(@Param('userId') userId: string, @Param('id') id: string) {
    const isValidUser = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidUser) throw new HttpException('User not found', 404);

    const isValidPost = mongoose.Types.ObjectId.isValid(id);
    if (!isValidPost) throw new HttpException('Post not found', 404);

    return this.postsService.deletePost(userId, id);
  }
}
