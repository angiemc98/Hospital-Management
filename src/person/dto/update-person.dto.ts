import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { CreatePersonDto } from "./create-person.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../person.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO para la actualización de una persona existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una persona.
 * Extiende de CreatePersonDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdatePersonDto
 * @extends {PartialType(CreatePersonDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo email y teléfono
 * const updateData: UpdatePersonDto = {
 *   email: "nuevoemail@example.com",
 *   phone: "3009876543"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdatePersonDto = {
 *   name: "Juan Carlos",
 *   lastname: "Pérez González",
 *   document: "1234567890",
 *   birthDate: new Date("1990-05-15"),
 *   email: "juan.perez@example.com",
 *   phone: "3001234567",
 *   role: Role.Doctor,
 *   gender: "Masculino"
 * };
 * ```
 */
export class UpdatePersonDto extends PartialType(CreatePersonDto) {

    /**
     * Nombre de la persona
     * 
     * @type {string}
     * @description Nombre o nombres de la persona
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "Juan", "María Fernanda"
     */
    @IsString()
    @Length(2, 100)
    @IsOptional()
    @ApiProperty({ name: 'name', description: 'First name of the person', type: String, example: 'Juan' })
    name: string;

    /**
     * Apellido de la persona
     * 
     * @type {string}
     * @description Apellido o apellidos de la persona
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "Pérez", "García López"
     */
    @IsString()
    @Length(2, 100)
    @IsOptional()
    @ApiProperty({ name: 'lastname', description: 'Last name of the person', type: String, example: 'Pérez' })
    lastname: string;

    /**
     * Documento de identidad de la persona
     * 
     * @type {string}
     * @description Número de documento de identidad único
     * @optional
     * 
     * @example "1234567890", "CC-1234567"
     */
    @IsString()
    @IsOptional()
    @ApiProperty({ name: 'document', description: 'Unique ID of the person', type: String, example: '1234567890' })
    document: string;

    /**
     * Fecha de nacimiento de la persona
     * 
     * @type {Date}
     * @description Fecha de nacimiento en formato ISO 8601
     * @optional
     * 
     * @example new Date("1990-05-15"), "1990-05-15"
     */
    @IsDateString()
    @IsOptional()
    @ApiProperty({ name: 'birthDate', description: 'Birth date of the person', type: Date, example: new Date('1990-05-15') })
    birthDate: Date;

    /**
     * Correo electrónico de la persona
     * 
     * @type {string}
     * @description Dirección de correo electrónico válida
     * @optional
     * 
     * @example "usuario@example.com"
     */
    @IsEmail()
    @IsOptional()
    @ApiProperty({ name: 'email', description: 'Email of the person', type: String, example: 'usuario@example.com' })
    email: string;

    /**
     * Teléfono de contacto de la persona
     * 
     * @type {string}
     * @description Número de teléfono móvil o fijo
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "3001234567", "+573001234567"
     */
    @IsString()
    @Length(2, 100)
    @IsOptional()
    @ApiProperty({ name: 'phone', description: 'Phone number of the person', type: String, example: '3001234567' })
    phone: string;

    /**
     * Rol de la persona en el sistema
     * 
     * @type {Role}
     * @description Define el tipo de usuario y sus permisos (doctor, paciente, admin)
     * @optional
     * 
     * @example Role.Doctor, Role.Patient, Role.Admin
     */
    @IsString()
    @IsOptional()
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