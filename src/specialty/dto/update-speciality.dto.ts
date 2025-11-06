import { PartialType } from '@nestjs/swagger';
import { CreateSpecialtyDto } from './create-specialty.dto';

/**
 * DTO para la actualización de una especialidad médica existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una especialidad.
 * Extiende de CreateSpecialtyDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateSpecialityDto
 * @extends {PartialType(CreateSpecialtyDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo descripción
 * const updateData: UpdateSpecialityDto = {
 *   descripcion: "Especialidad avanzada del sistema cardiovascular"
 * };
 * ```
 */
export class UpdateSpecialityDto extends PartialType(CreateSpecialtyDto) {}