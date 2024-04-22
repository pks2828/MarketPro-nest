import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  private readonly logger = new Logger('ClientService')

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ){}

  async create(createClientDtos: CreateClientDto[]): Promise<Client[]> {
    
    try {
      const clients = createClientDtos.map((createClientDto) => {
        const client = new Client();
        // Copy properties from createClientDto to client
        Object.assign(client, createClientDto);
        return client;
    });

      return this.clientRepository.save(clients);
      
    } catch (error) {
      this.handleDBException(error)
    }

}

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(term: string) {

    const client = await this.clientRepository.findOneBy({id: term})

    if (!client) {
      throw new BadRequestException('Client not found')
    }

    return client
  }

  async update(id: string, updateClientDto: UpdateClientDto) {

    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto
    })

    if ( !client ) {throw new NotFoundException('Client not found')}

    try {
      await this.clientRepository.save(client)
      return client

    } catch (error) {
      this.handleDBException(error)
    }

  }

  async remove(id: string) {
    const cliente = await this.findOne(id)

    await this.clientRepository.remove(cliente)

    return {
      message: `Client ${id} removed successfully`
    }
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
