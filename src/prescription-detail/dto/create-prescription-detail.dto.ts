import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDetailDto {
    @ApiProperty({
        description: 'The ID of the prescription',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    prescriptionId: number;
    
    @ApiProperty({
        description: 'The ID of the medicine',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    medicineId: number;

    @ApiProperty({
        description: 'The dose of the medicine',
        example: '1 tablet',
    })
    @IsString()
    @IsNotEmpty()
    dose: string;

    @ApiProperty({
        description: 'The duration of the treatment in days',
        example: 15,
    })
    @IsInt()
    @IsNotEmpty()
    duration: number;

    @ApiProperty({
        description: 'Instructions for taking the medicine',
        example: 'Take one tablet every 8 hours.',
    })
    @IsString()
    @IsNotEmpty()
    instructions: string;
}