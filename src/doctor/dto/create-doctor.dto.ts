import { IsInt, IsString, Length } from "class-validator";


// Create Doctor DTO
export class CreateDoctorDto {

    // Create PersonIf 
    @IsInt()
    personaId: number;

    // Create SpecialtyId
    @IsInt()
    specialtyId: number;

    // Create LicenseNumber
    // Is required, length between 2 and 100
    @IsString()
    @Length(2, 100)
    licenseNumber: string;
}