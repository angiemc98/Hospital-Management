import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../person/person.entity';
import { ApiProperty } from '@nestjs/swagger';




export class RegisterDto {

    @ApiProperty({ name: 'name', description: 'First name of the user', type: String, example: 'Juan' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ name: 'lastname', description: 'Last name of the user', type: String, example: 'Pérez' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ name: 'document', description: 'Unique ID of the user', type: String, example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    document: string;

    @ApiProperty({ name: 'birthDate', description: 'Birth date of the user', type: Date, example: new Date('1990-05-15') })
    @IsOptional()
    @IsDateString()
    birthDate?: Date;

    @ApiProperty({ name: 'phone', description: 'Phone number of the user', type: String, example: '3001234567' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ name: 'email', description: 'Email of the user', type: String, example: 'usuario@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ name: 'password', description: 'Password of the user', type: String, example: 'securePass123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;

    @ApiProperty({ name: 'role', description: 'Role of the user', type: String, example: Role.Doctor })
    @IsOptional()
    @IsEnum(Role) 
    role?: Role;

}