import { IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialtyDto{
    @ApiProperty({
        description: 'The name of the specialty',
        example: 'Cardiology',
    })
    @IsString()
    @Length(2, 100)
    name: string;

    @ApiProperty({
        description: 'A description of the specialty',
        example: 'Specialty focused on heart diseases.',
        required: false,
    })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    descripcion: string;
}