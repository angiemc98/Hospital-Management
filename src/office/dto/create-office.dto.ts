import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeDto {
    @ApiProperty({
        description: 'The office number',
        example: 101,
    })
    @IsInt()
    @IsPositive()
    num_consultorio: number;

    @ApiProperty({
        description: 'The floor where the office is located',
        example: 1,
    })
    @IsInt()
    piso: number;

    @ApiProperty({
        description: 'Indicates if the office is available',
        example: true,
    })
    @IsBoolean()
    disponible: boolean;
}