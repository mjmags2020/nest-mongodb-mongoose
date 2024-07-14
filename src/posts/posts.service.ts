import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dto/CreatePost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.modelName) private postModel: Model<Post>,
    @InjectModel(User.modelName) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User not found', 404);

    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();

    await findUser.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });

    return savedPost;
  }
  getPosts() {
    return this.postModel.find();
  }
  findPostById(id: string) {
    return this.postModel.findById(id);
  }

  async deletePost(userId: string, id: string) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User not found', 404);

    const deletedPost = await this.postModel.findByIdAndDelete(id);
    await findUser.updateOne(
      {
        $pull: {
          posts: id,
        },
      },
      { new: true },
    );
    return deletedPost;
  }
}
