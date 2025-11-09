import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


// Create Prescription Detail DTO
export class CreatePrescriptionDetailDto {
    
    @ApiProperty({ name: 'prescriptionId', description: 'ID of the prescription', type: Number, example: 1 })
    @IsInt()
    @IsNotEmpty()
    prescriptionId: number;
    
    @ApiProperty({ name: 'medicineId', description: 'ID of the medicine', type: Number, example: 1 })
    @IsInt()
    @IsNotEmpty()
    medicineId: number;

    @ApiProperty({ name: 'dose', description: 'Dose of the medicine', type: String, example: '1 dose' })
    @IsString()
    @IsNotEmpty()
    dose: string;

    @ApiProperty({ name: 'duration', description: 'Duration of the medicine', type: Number, example: 20 })
    @IsInt()
    @IsNotEmpty()
    duration: number;

    @ApiProperty({ name: 'instrucitons', description: 'Instructions of the medicine', type: String, example: 'Take 1 tablet every 20 minutes' })
    @IsString()
    @IsNotEmpty()
    instrucitons: string;
    
}