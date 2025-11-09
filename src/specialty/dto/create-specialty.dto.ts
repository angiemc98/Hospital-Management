import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

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
    @ApiProperty({ name: 'name', description: 'Name of the specialty', type: String, example: 'Cardiología' })
    @IsString()
    @Length(2, 100)
    name: string;

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
    @ApiProperty({ name: 'descripcion', description: 'Description of the specialty', type: String, example: 'Especialidad dedicada al diagnóstico y tratamiento de enfermedades del corazón' })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    descripcion: string;

}