import { IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

<<<<<<< HEAD
export class CreateSpecialtyDto{
    @ApiProperty({
        description: 'The name of the specialty',
        example: 'Cardiology',
    })
=======
/**
 * DTO para la creación de una nueva especialidad médica
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear una especialidad.
 * Utiliza class-validator para garantizar la integridad de los datos.
 * 
 * @export
 * @class CreateSpecialtyDto
 * 
 * @example
 * ```typescript
 * const newSpecialty: CreateSpecialtyDto = {
 *   name: "Cardiología",
 *   descripcion: "Especialidad médica dedicada al estudio del corazón"
 * };
 * ```
 */
export class CreateSpecialtyDto{
    
    /**
     * Nombre de la especialidad
     * 
     * @type {string}
     * @description Nombre de la especialidad médica
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Cardiología", "Pediatría", "Dermatología", "Neurología"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    name: string;

<<<<<<< HEAD
    @ApiProperty({
        description: 'A description of the specialty',
        example: 'Specialty focused on heart diseases.',
        required: false,
    })
=======
    /**
     * Descripción de la especialidad
     * 
     * @type {string}
     * @description Información adicional sobre la especialidad, sus campos de acción o características
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "Especialidad dedicada al diagnóstico y tratamiento de enfermedades del corazón"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    @IsOptional()
    descripcion: string;
}