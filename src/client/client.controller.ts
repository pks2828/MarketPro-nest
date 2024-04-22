import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {



  constructor(private readonly clientService: ClientService) {}
  
  @Post()
  async create(@Body() createClientDtos: CreateClientDto[]) {
      return this.clientService.create(createClientDtos);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.clientService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
