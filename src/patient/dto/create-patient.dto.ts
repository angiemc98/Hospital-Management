import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";


// Create Patient DTO
export class CreatePatientDto {

    @IsInt()
    @IsNotEmpty()
    personId: number;

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