import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findOne(id: number) {
    if(!id){
        return null;
    }
    return this.userRepo.findOneBy({id});
  }

  async create(email: string, password: string): Promise<User>{
    const user = await this.userRepo.create({ email,password});
    
    return await this.userRepo.save(user);
  }

  async find(email: string): Promise<User[]> {
    return await this.userRepo.find({where: {email}})
  }
}
