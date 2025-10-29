import { IsOptional, IsString, Length } from "class-validator";

// Create Specialty DTO
export class CreateSpecialtyDto{
    
    @IsString()
    @Length(2, 100)
    name: string;

    @IsString()
    @Length(2, 100)
    @IsOptional()
    descripcion: string;

}