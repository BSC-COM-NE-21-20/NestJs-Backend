 // src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './expo/user.entity';
import { UserController } from './expo/user.controller';
import { UserService } from './expo/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Change to MySQL server host
      port: 3306, // Change to MySQL server port
      username: 'root', // Change to MySQL username
      password: '', // Change to MySQL password
      database: 'starkdb', // Change to MySQL database name
      autoLoadEntities: true,
      synchronize: true, // Automatically create database tables (for development purposes)
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
