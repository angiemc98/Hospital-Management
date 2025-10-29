import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";

export class CreatePersonDto {

    @IsString()
    @Length(2, 100)
    name: string;

    @IsString()
    @Length(2, 100)
    lastname: string;

    @IsString()
    document: string;

    @Type(() => Date)
    @IsDateString()
    birthDate: Date;

    @IsString()
    @Length(2, 100)
    phone: string;

    @IsEmail()
    email: string;

    // validaciones contraseña 
    @IsString({ message: 'La contraseña debe tener caracteres validos' })
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    password: string;

    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;

    @IsString()
    @IsOptional()
    gender: string;

}