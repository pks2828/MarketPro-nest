import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Category {
    CATEGORY1 = "Cuidado",
    CATEGORY2 = "Comida",
    CATEGORY3 = "Farmacia",
    CATEGORY4 = "Hogar",
    CATEGORY5 = "Deportes",
    CATEGORY6 = "Juguetes",
    CATEGORY7 = "Bebidas",
    CATEGORY8 = "Limpieza",
    CATEGORY9 = "Mascotas",
    // Add more categories as needed
}

@Entity()

export class Inventary {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    title: string;

    @Column({
        type: "enum",
        enum: Category,
        default: Category.CATEGORY1
    })
    category: Category;

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
