import { Type } from "class-transformer";
import { IsInt, IsOptional, IsDateString , IsString, ValidateNested, IsArray, IsNumber } from "class-validator";
import { CreatePrescriptionDetailDto } from "../../prescription-detail/dto/create-prescription-detail.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
    @ApiProperty({
        description: 'The date of the prescription',
        example: '2024-07-20T10:00:00Z',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    date?: Date;

    @ApiProperty({
        description: 'Observations for the prescription',
        example: 'Take with food.',
        required: false,
    })
    @IsString()
    @IsOptional()
    observations: string;

    @ApiProperty({
        description: 'The quantity of the medicine',
        example: 30,
    })
    @IsInt()
    quantity: number;

    @ApiProperty({
        description: 'The duration of the treatment in days',
        example: 15,
    })
    @IsInt()
    duration: number;

    @ApiProperty({
        description: 'The ID of the appointment',
        example: 1,
    })
    @IsNumber()
    appointmentId: number;

    @ApiProperty({
        description: 'The ID of the medicine',
        example: 1,
    })
    @IsNumber()
    medicineId: number;

    @ApiProperty({
        description: 'The details of the prescription',
        type: [CreatePrescriptionDetailDto],
    })
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePrescriptionDetailDto)
    details: CreatePrescriptionDetailDto[];
}