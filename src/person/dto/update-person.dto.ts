import { IsDateString, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { CreatePersonDto } from "./create-person.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../person.entity";



// Update Person DTO
export class UpdatePersonDto extends PartialType(CreatePersonDto) {

    @IsString()
    @Length(2, 100)
    name: string;

    @IsString()
    @Length(2, 100)
    lastname: string;

    @IsString()
    document: string;

    @IsDateString()
    birthDate: Date;

    @IsEmail()
    email: string;

    @IsString()
    @Length(2, 100)
    phone: string;

    @IsString()
    role: Role;

    @IsString()
    @IsOptional()
    gender: string;

}