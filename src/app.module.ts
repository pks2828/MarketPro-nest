import { Module } from '@nestjs/common';
import { InventaryModule } from './inventary/inventary.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //! Don't use this in production
    }),

    InventaryModule,
    AuthModule,
    OrdersModule,
    ClientModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
