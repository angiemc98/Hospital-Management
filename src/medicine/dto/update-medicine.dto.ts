import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';

// Update Medicine DTO
export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {

    @IsInt()
    id: number;

    @IsString()
    @Length(2, 100)
    name: string;

    @IsString()
    @Length(2, 50)
    type: string;

    @IsString()
    @Length(2, 50)
    presentation: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;

    @IsInt()
    @Min(0)
    price: string;
}