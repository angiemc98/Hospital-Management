import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";

// Update Patient DTO
export class UpdatePatientDto {

    @IsInt()
    @IsNotEmpty()
    personid: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    bloodType?: string;

    @IsString()
    @IsNotEmpty()
    insurance?: string;

    @IsString()
    @IsNotEmpty()
    medicalHistory: string;
}