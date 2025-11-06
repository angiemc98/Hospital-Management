import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";

export class CreatePersonDto {

    @ApiProperty({ description: 'Name of the person', example: 'John' })
    @IsString()
    @Length(2, 100)
    name: string;

    @ApiProperty({ description: 'Lastname of the person', example: 'Doe' })
    @IsString()
    @Length(2, 100)
    lastname: string;

    @ApiProperty({ description: 'Document number of the person', example: '123456789' })
    @IsString()
    document: string;

    @ApiProperty({ description: 'Birth date of the person', example: '1990-01-01' })
    @Type(() => Date)
    @IsDateString()
    birthDate: Date;

    @ApiProperty({ description: 'Phone number of the person', example: '3001234567' })
    @IsString()
    @Length(2, 100)
    phone: string;

    @ApiProperty({ description: 'Email of the person', example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password for the person account', example: 'Password123' })
    @IsString({ message: 'La contraseña debe tener caracteres validos' })
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    password: string;

    @ApiProperty({ description: 'Role of the person', enum: Role, example: Role.Patient })
    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;

    @ApiProperty({ description: 'Gender of the person', example: 'Male', required: false })
    @IsString()
    @IsOptional()
    gender: string;
}