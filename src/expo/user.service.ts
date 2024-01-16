 // src/expo/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({where: { username }});
  }

  async updateProfileImage(username: string, filename: string): Promise<void> {
    await this.userRepository.update({ username }, { profileImage: filename });
  }
}
