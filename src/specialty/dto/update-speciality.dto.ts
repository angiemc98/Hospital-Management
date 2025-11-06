import { PartialType } from '@nestjs/swagger';
import { CreateSpecialtyDto } from './create-specialty.dto';

<<<<<<< HEAD
export class UpdateSpecialtyDto extends PartialType(CreateSpecialtyDto) {}
=======
/**
 * DTO para la actualización de una especialidad médica existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una especialidad.
 * Permite actualizaciones parciales de los datos de la especialidad.
 * 
 * @export
 * @class UpdateSpecialtyDto
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo descripción
 * const updateData: UpdateSpecialtyDto = {
 *   description: "Especialidad avanzada del sistema cardiovascular"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateSpecialtyDto = {
 *   name: "Cardiología Intervencionista",
 *   description: "Especialidad dedicada a procedimientos invasivos del corazón"
 * };
 * ```
 */
export class UpdateSpecialtyDto {
    
    /**
     * Nombre de la especialidad
     * 
     * @type {string}
     * @description Nombre de la especialidad médica
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "Cardiología", "Pediatría", "Dermatología", "Neurología"
     */
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
    @IsString()
    @Length(2, 100)
    @IsOptional()
    description: string;

}
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
