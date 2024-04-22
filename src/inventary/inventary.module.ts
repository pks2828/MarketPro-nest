import { Module } from '@nestjs/common';
import { InventaryService } from './inventary.service';
import { InventaryController } from './inventary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventary } from './entities/inventary.entity';

@Module({
  controllers: [InventaryController],
  providers: [InventaryService],
  imports: [
    TypeOrmModule.forFeature([ Inventary ])
  ]
})
export class InventaryModule {}
