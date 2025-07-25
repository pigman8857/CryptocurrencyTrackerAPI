import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { TestTable } from './test.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/testdata/:id')
  async getTestData(@Param('id' )id: number): Promise<TestTable> {
    return await this.appService.getTestData(id);
  }
}
