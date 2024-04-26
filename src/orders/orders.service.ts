import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) {
    
    try {
      const order = this.orderRepository.create(createOrderDto)
      order.isActive = true;
      const result = await this.orderRepository.save(order)
      
      return result;
      
    } catch (error) {
      this.handleDBException(error)
      
    }

  }

  findAll() {
   return this.orderRepository.find()
  }

  async findOne(term: string) {

    const inventary = await this.orderRepository.findOneBy({id: term})

    if (!inventary) {
      throw new BadRequestException('Order not found')
    }

    return inventary

  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    
    const order = await this.orderRepository.preload({
      id: id,
      ...updateOrderDto
    })

    if ( !order ) throw new NotFoundException(`Order with id ${id} not found`)

    try {
      await this.orderRepository.save(order)
      return order
      
    } catch (error) {
      this.handleDBException(error)
      
    }

  }

  async remove(id: string) {
    const order = await this.findOne(id);
    
    if (!order) {
        throw new NotFoundException(`order with ID ${id} not found`);
    }

    order.isActive = false;

    await this.orderRepository.save(order);
    
    return `ID ${id} deactivated successfully`;
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
