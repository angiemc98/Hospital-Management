import { Type } from "class-transformer";
import { IsInt, IsOptional, IsDateString , IsString, ValidateNested, IsArray, IsNumber } from "class-validator";
import { CreatePrescriptionDetailDto } from "../../prescription-detail/dto/create-prescription-detail.dto";
import { ApiProperty } from "@nestjs/swagger";


// Create Prescription DTO
export class CreatePrescriptionDto {

    @ApiProperty({ name: 'date', description: 'Date of the prescription', type: Date, example: new Date('2024-08-15T10:00:00Z') })
    @IsDateString()
    @IsOptional()
    date?: Date;

    @ApiProperty({ name: 'reason', description: 'Reason for the prescription', type: String, example: 'Consulta de control' })
    @IsString()
    @IsOptional()
    observations: string;

    @ApiProperty({ name: 'quantity', description: 'Quantity of the prescription', type: Number, example: 1 })
    @IsInt()
    quantity: number;

    @ApiProperty({ name: 'duration', description: 'Duration of the prescription', type: Number, example: 20 })
    @IsInt()
    duration: number;

    @ApiProperty({ name: 'appointmentId', description: 'ID of the appointment', type: Number, example: 1 })
    @IsNumber()
    appointmentId: number;

    @ApiProperty({ name: 'medicineId', description: 'ID of the medicine', type: Number, example: 1 })
    @IsNumber()
    medicineId: number;

    @ApiProperty({ name: 'doctorId', description: 'ID of the doctor', type: Number, example: 1 })
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePrescriptionDetailDto)
    details: CreatePrescriptionDetailDto[];
    
}
