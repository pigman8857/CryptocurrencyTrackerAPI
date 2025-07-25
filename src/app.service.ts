import { Injectable,Inject } from '@nestjs/common';
import { TestTable } from './test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AppService {

  constructor( @Inject('TEST_REPOSITORY')private repo: Repository<TestTable>){}
  getHello(): string {
    return 'Hello World!';
  }

  async getTestData(id: number) : Promise<TestTable>{
    return this.repo.findOneBy({id}) 
  }
}
