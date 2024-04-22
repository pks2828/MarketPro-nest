import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    name: string;

    @Column('text',{
        unique: true,
    })
    email: string;

    @Column('text',{
        nullable: true,
    })
    phone: string;

    @Column('text',{
        nullable: true,
    })
    address: string;

    @Column('text',{
        nullable: true,
    })
    city: string;

    @Column('text',{
        nullable: true,
    })
    country: string;

    @Column('text',{
        nullable: true,
    })
    postalCode: number;

    @Column('int',{
        nullable: true,
    })
    dni: number;

    @Column('text',{
        nullable: true,
    })
    birthday: string;

    @Column('text',{
        nullable: true,
    })
    gender: string;

}
