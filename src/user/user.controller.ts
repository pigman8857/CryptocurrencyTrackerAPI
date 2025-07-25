import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { TestTable } from 'src/test.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    async getTestData(@Param('id' )id: number): Promise<TestTable> {
      return await this.userService.getTestData(id);
    }
}
