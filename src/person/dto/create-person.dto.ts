import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";

/**
 * DTO para la creación de una nueva persona
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear una persona en el sistema.
 * Utiliza class-validator para garantizar la integridad de los datos, incluyendo
 * validaciones específicas para contraseñas y roles.
 * 
 * @export
 * @class CreatePersonDto
 * 
 * @example
 * ```typescript
 * const newPerson: CreatePersonDto = {
 *   name: "Juan",
 *   lastname: "Pérez",
 *   document: "1234567890",
 *   birthDate: new Date("1990-05-15"),
 *   phone: "3001234567",
 *   email: "juan@example.com",
 *   password: "securePass123",
 *   role: Role.Patient,
 *   gender: "Masculino"
 * };
 * ```
 */
export class CreatePersonDto {

<<<<<<< HEAD
    @ApiProperty({ description: 'Name of the person', example: 'John' })
=======
    /**
     * Nombre de la persona
     * 
     * @type {string}
     * @description Nombre o nombres de la persona
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Juan", "María Fernanda"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    name: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Lastname of the person', example: 'Doe' })
=======
    /**
     * Apellido de la persona
     * 
     * @type {string}
     * @description Apellido o apellidos de la persona
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Pérez", "García López"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    lastname: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Document number of the person', example: '123456789' })
    @IsString()
    document: string;

    @ApiProperty({ description: 'Birth date of the person', example: '1990-01-01' })
=======
    /**
     * Documento de identidad de la persona
     * 
     * @type {string}
     * @description Número de documento de identidad único
     * @required
     * 
     * @example "1234567890", "CC-1234567"
     */
    @IsString()
    document: string;

    /**
     * Fecha de nacimiento de la persona
     * 
     * @type {Date}
     * @description Fecha de nacimiento en formato ISO 8601
     * @required
     * 
     * @example new Date("1990-05-15"), "1990-05-15"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @Type(() => Date)
    @IsDateString()
    birthDate: Date;

<<<<<<< HEAD
    @ApiProperty({ description: 'Phone number of the person', example: '3001234567' })
=======
    /**
     * Teléfono de contacto de la persona
     * 
     * @type {string}
     * @description Número de teléfono móvil o fijo
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "3001234567", "+573001234567"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    phone: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Email of the person', example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password for the person account', example: 'Password123' })
    @IsString({ message: 'La contraseña debe tener caracteres validos' })
=======
    /**
     * Correo electrónico de la persona
     * 
     * @type {string}
     * @description Dirección de correo electrónico válida
     * @required
     * 
     * @example "usuario@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Contraseña de la persona
     * 
     * @type {string}
     * @description Contraseña para acceso al sistema. Será hasheada automáticamente antes de guardar.
     * @minLength 8
     * @maxLength 50
     * @required
     * 
     * @example "securePass123", "MyP@ssw0rd!"
     */
    @IsString({ message: 'La contraseña debe tener caracteres válidos' })
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    password: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Role of the person', enum: Role, example: Role.Patient })
    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;

    @ApiProperty({ description: 'Gender of the person', example: 'Male', required: false })
=======
    /**
     * Rol de la persona en el sistema
     * 
     * @type {Role}
     * @description Define el tipo de usuario y sus permisos (doctor, paciente, admin)
     * @required
     * 
     * @example Role.Doctor, Role.Patient, Role.Admin
     */
    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;

    /**
     * Género de la persona
     * 
     * @type {string}
     * @description Género con el que se identifica la persona
     * @optional
     * 
     * @example "Masculino", "Femenino", "No binario", "Prefiero no decir"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @IsOptional()
    gender: string;
}