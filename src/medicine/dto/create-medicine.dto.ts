import { IsInt, IsOptional, IsString, Length, Min, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
    @ApiProperty({
        description: 'The name of the medicine',
        example: 'Ibuprofen',
    })
    @IsString()
    @Length(2, 100)
    name: string;

    @ApiProperty({
        description: 'The type of the medicine',
        example: 'Analgesic',
    })
    @IsString()
    @Length(2, 50)
    type: string;

    @ApiProperty({
        description: 'The presentation of the medicine',
        example: 'Tablet',
    })
    @IsString()
    @Length(2, 50)
    presentation: string;

    @ApiProperty({
        description: 'The stock of the medicine',
        example: 100,
    })
    @IsInt()
    @Min(0)
    stock: number;

    @ApiProperty({
        description: 'A description of the medicine',
        example: 'Used to relieve pain and reduce inflammation.',
        required: false,
    })
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'The price of the medicine',
        example: 10.50,
    })
    @IsNumber()
    @Min(0)
    price: number;
}