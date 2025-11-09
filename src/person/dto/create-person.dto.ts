import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

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
    @IsString()
    @Length(2, 100)
    @ApiProperty({ name: 'name', description: 'First name of the person', type: String, example: 'Juan' })
    name: string;

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
    @IsString()
    @Length(2, 100)
    @ApiProperty({ name: 'lastname', description: 'Last name of the person', type: String, example: 'Pérez' })
    lastname: string;

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
    @ApiProperty({ name: 'document', description: 'Unique ID of the person', type: String, example: '1234567890' })
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
    @Type(() => Date)
    @IsDateString()
    @ApiProperty({ name: 'birthDate', description: 'Birth date of the person', type: Date, example: new Date('1990-05-15') })
    birthDate: Date;

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
    @IsString()
    @Length(2, 100)
    @ApiProperty({ name: 'phone', description: 'Phone number of the person', type: String, example: '3001234567' })
    phone: string;

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
    @ApiProperty({ name: 'email', description: 'Email of the person', type: String, example: 'usuario@example.com' })
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
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    @ApiProperty({ name: 'password', description: 'Password of the person', type: String, example: 'securePass123' })
    password: string;

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
    @ApiProperty({ name: 'role', description: 'Role of the person', example: Role.Doctor })
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
    @IsString()
    @IsOptional()
    @ApiProperty({ name: 'gender', description: 'Gender of the person', type: String, example: 'Masculino' })
    gender: string;

}