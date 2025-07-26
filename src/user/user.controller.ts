import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    async getTestData(@Param('id' )id: number): Promise<User> {
      return await this.userService.getTestData(id);
    }
}
