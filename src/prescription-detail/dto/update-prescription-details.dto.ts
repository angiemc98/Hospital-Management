import { PartialType } from "@nestjs/mapped-types";
import { CreatePrescriptionDetailDto } from "./create-prescription-detail.dto";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";


// Update Prescription Detail DTO
export class UpdatePrescriptionDetailsDto extends PartialType(CreatePrescriptionDetailDto) {

    @ApiProperty({ name: 'medicineId', description: 'ID of the medicine', type: Number, example: 1 })
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