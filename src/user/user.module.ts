import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TestTable } from 'src/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestTable])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
