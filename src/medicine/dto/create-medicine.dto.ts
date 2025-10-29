import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";


// Create Medicine DTO
export class CreateMedicineDto {

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