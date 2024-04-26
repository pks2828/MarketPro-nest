import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    product: string;

    @Column('int')
    quantity: number;

    @Column('bool')
    isActive: boolean;

}
