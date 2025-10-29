import { IsBoolean, IsInt, IsPositive } from 'class-validator';

// Create Office DTO
export class CreateOfficeDto {
    @IsInt()
    @IsPositive()
    num_consultorio: number;

    @IsInt()
    piso: number;

    @IsBoolean()
    disponible: boolean;
}
