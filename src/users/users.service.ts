import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModule } from './users.module';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSetting.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.modelName) private userModel: Model<User>,
    @InjectModel(UserSettings.modelName)
    private userSettingModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingModel(settings);
      const newSaveSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: newSaveSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['settings', 'posts']);
  }

  updateUser(id: string, updateuserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateuserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
