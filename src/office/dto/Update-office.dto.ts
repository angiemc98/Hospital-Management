import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { CreateOfficeDto } from './create-office.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la actualización de un consultorio existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar un consultorio.
 * Extiende de CreateOfficeDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateOfficeDto
 * @extends {PartialType(CreateOfficeDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo disponibilidad
 * const updateData: UpdateOfficeDto = {
 *   disponible: false
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateOfficeDto = {
 *   num_consultorio: 102,
 *   piso: 2,
 *   disponible: true
 * };
 * ```
 */
export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
    /**
     * Número del consultorio
     * 
     * @type {number}
     * @description Número identificador del consultorio, debe ser un entero positivo
     * @optional
     * 
     * @example 101, 202, 305
     */
    @ApiProperty({ name: 'num_consultorio', description: 'Consultorio number', type: Number, example: 101 })
    @IsInt()
    @IsPositive()
    num_consultorio: number;

    /**
     * Piso donde se ubica el consultorio
     * 
     * @type {number}
     * @description Número de piso en el que se encuentra el consultorio
     * @optional
     * 
     * @example 1, 2, 3, -1 (sótano)
     */
    @ApiProperty({ name: 'piso', description: 'Floor number', type: Number, example: 1 })
    @IsInt()
    piso: number;

    /**
     * Disponibilidad del consultorio
     * 
     * @type {boolean}
     * @description Indica si el consultorio está disponible (true) u ocupado (false)
     * @optional
     * 
     * @example true, false
     */
    @ApiProperty({ name: 'disponible', description: 'Availability of the office', type: Boolean, example: true })
    @IsBoolean()
    disponible: boolean;
}