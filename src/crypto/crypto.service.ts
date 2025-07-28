import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypto } from './entities/crypto.entity';
import { UpdateCryptoDto } from './dto/update-crypto.dto';

@Injectable()
export class CryptoService {
  constructor(@InjectRepository(Crypto)private cryptoRepo: Repository<Crypto>){}

  async create(createCryptoDto: CreateCryptoDto): Promise<Crypto> {
    const cryptoToBeDeleted = await this.findOne(createCryptoDto.id);
    if(cryptoToBeDeleted){
        throw new BadRequestException('The crypto already exist');
    }
    const createdCrypto = this.cryptoRepo.create({id: createCryptoDto.id,name: createCryptoDto.name });
    return await this.cryptoRepo.save(createdCrypto);
  }

  async findAll(): Promise<Crypto[]> {
    return await this.cryptoRepo.find({});
  }

  async findOne(id: number): Promise<Crypto> {
    if(!id){
        return null;
    }

    return await this.cryptoRepo.findOne({where:{id}});
  }

  async update(cryptoId: number, updateCryptoDto: UpdateCryptoDto){
    if(!cryptoId){
        return null;
    }
    const cryptoToBeUpdated= await this.findOne(cryptoId);
    if(!cryptoToBeUpdated){
        throw new BadRequestException('The crypto not found');
    }

    return await this.cryptoRepo.update(cryptoId,{name: updateCryptoDto.name});
  }

  async remove(id: number) {
    const cryptoToBeDeleted = await this.findOne(id);
    if(!cryptoToBeDeleted){
        throw new BadRequestException('The crypto not found');
    }

    return this.cryptoRepo.remove(cryptoToBeDeleted);
  }
}
