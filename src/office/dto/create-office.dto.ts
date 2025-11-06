import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de un nuevo consultorio
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear un consultorio.
 * Utiliza class-validator para garantizar la integridad de los datos.
 * 
 * @export
 * @class CreateOfficeDto
 * 
 * @example
 * ```typescript
 * const newOffice: CreateOfficeDto = {
 *   num_consultorio: 101,
 *   piso: 1,
 *   disponible: true
 * };
 * ```
 */
export class CreateOfficeDto {
    /**
     * Número del consultorio
     * 
     * @type {number}
     * @description Número identificador del consultorio, debe ser un entero positivo
     * @required
     * 
     * @example 101, 202, 305
     */
    @ApiProperty({
        description: 'The office number',
        example: 101,
    })
    @IsInt()
    @IsPositive()
    num_consultorio: number;

    /**
     * Piso donde se ubica el consultorio
     * 
     * @type {number}
     * @description Número de piso en el que se encuentra el consultorio
     * @required
     * 
     * @example 1, 2, 3, -1 (sótano)
     */
    @ApiProperty({
        description: 'The floor where the office is located',
        example: 1,
    })
    @IsInt()
    piso: number;

    /**
     * Disponibilidad del consultorio
     * 
     * @type {boolean}
     * @description Indica si el consultorio está disponible (true) u ocupado (false)
     * @required
     * 
     * @example true, false
     */
    @ApiProperty({
        description: 'Indicates if the office is available',
        example: true,
    })
    @IsBoolean()
    disponible: boolean;
}