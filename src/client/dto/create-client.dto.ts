import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsNumber()
    @IsNotEmpty()
    postalCode: number;

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsIn(['M','F'])
    gender: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;
}