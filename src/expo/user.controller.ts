 // src/expo/user.controller.ts
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<{ message: string }> {
    const existingUser = await this.userService.findOne(user.username);

    if (existingUser) {
      return { message: 'Username already exists' };
    }

    await this.userService.create(user);
    return { message: 'User created successfully' };
  }

  @Post('upload-profile-image')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads', // Set your upload directory
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('username') username: string,
  ): Promise<{ message: string }> {
    // Save the file information to the user in the database
    await this.userService.updateProfileImage(username, file.filename);

    return { message: 'Profile image uploaded successfully' };
  }
}
