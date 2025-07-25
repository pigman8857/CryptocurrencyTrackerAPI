import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTable } from 'src/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TestTable)
    private readonly testTableRepo: Repository<TestTable>,
  ) {}

  async getTestData(id: number) : Promise<TestTable>{
    return this.testTableRepo.findOneBy({id}) 
  }
}
