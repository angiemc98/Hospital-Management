import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';
import  { IsInt, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

// Update Prescription DTO
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
    
    @ApiProperty({ name: 'date', description: 'Date of the prescription', type: Date, example: new Date('2024-08-15T10:00:00Z') })
    @IsString()
    observations: string;

    @ApiProperty({ name: 'quantity', description: 'Quantity of the prescription', type: Number, example: 1 })
    @IsInt()
    quantity: number;

    @ApiProperty({ name: 'duration', description: 'Duration of the prescription', type: Number, example: 20 })
    @IsInt()
    duration: number;

    @ApiProperty({ name: 'appointmentId', description: 'ID of the appointment', type: Number, example: 1 })
    @IsInt()
    appointmentId: number;


}
