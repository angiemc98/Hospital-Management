import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../person/person.entity';




export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsOptional()
    @IsDateString()
    birthDate?: Date;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;

    @IsOptional()
    @IsEnum(Role) 
    role?: Role;

}