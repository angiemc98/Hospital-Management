import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

<<<<<<< HEAD
export class CreateOfficeDto {
    @ApiProperty({
        description: 'The office number',
        example: 101,
    })
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsInt()
    @IsPositive()
    num_consultorio: number;

<<<<<<< HEAD
    @ApiProperty({
        description: 'The floor where the office is located',
        example: 1,
    })
    @IsInt()
    piso: number;

    @ApiProperty({
        description: 'Indicates if the office is available',
        example: true,
    })
=======
    /**
     * Piso donde se ubica el consultorio
     * 
     * @type {number}
     * @description Número de piso en el que se encuentra el consultorio
     * @required
     * 
     * @example 1, 2, 3, -1 (sótano)
     */
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsBoolean()
    disponible: boolean;
}