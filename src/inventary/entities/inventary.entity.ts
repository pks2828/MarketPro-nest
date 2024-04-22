import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventary {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    title: string;

    @Column('text',{
        unique: true,
    })
    category: string;

    @Column('float',{
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column('int',{
        default: 0,
    })
    stock: number;

    @Column('text',{
        array: true,
        nullable: true,
        default: '{}'
    })
    tags: string[];

 

}
