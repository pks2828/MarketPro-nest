import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInventaryDto } from './dto/create-inventary.dto';
import { UpdateInventaryDto } from './dto/update-inventary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventary } from './entities/inventary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventaryService {

  private readonly logger = new Logger('InventaryService')

  constructor(
    @InjectRepository(Inventary)
    private inventaryRepository: Repository<Inventary>
  ){}

  async create(createInventaryDto: CreateInventaryDto) {
    try {
      const inventary = this.inventaryRepository.create(createInventaryDto)
      await this.inventaryRepository.save(inventary)
      
      return inventary

    } catch (error) {
      this.handleDBException(error)
    }
  }

  //TODO: Implement paginations
  findAll() {
    return this.inventaryRepository.find();
  }

  async findOne(term: string) {

    const inventary = await this.inventaryRepository.findOneBy({id: term})

    if (!inventary) {
      throw new BadRequestException('Inventary not found')
    }

    return inventary

  }

  async update(id: string, updateInventaryDto: UpdateInventaryDto) {
    
    const inventary = await this.inventaryRepository.preload({
      id: id,
      ...updateInventaryDto
    })

    if ( !inventary ) throw new NotFoundException(`Product with id ${id} not found`)

    try {
      await this.inventaryRepository.save(inventary)
      return inventary
      
    } catch (error) {
      this.handleDBException(error)
    }

  }

 async remove(id: string) {
    const inventary = await this.findOne(id);
    
    if (!inventary) {
        throw new NotFoundException(`Inventary with ID ${id} not found`);
    }

    const inventaryId = inventary.id;

    await this.inventaryRepository.remove(inventary);
    
    return `ID ${inventaryId} removed successfully`;
}



  private handleDBException(error: any) {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }

    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, ckeck the logs for more information')
  }
  
}
