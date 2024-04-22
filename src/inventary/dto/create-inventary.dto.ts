import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsInt, IsArray, Min } from "class-validator";
import { Category } from "../entities/inventary.entity";

export class CreateInventaryDto {
    
    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    description: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    stock: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @IsString()
    category: Category;
    
}
