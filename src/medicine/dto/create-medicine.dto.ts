import { IsInt, IsOptional, IsString, Length, Min, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

<<<<<<< HEAD
export class CreateMedicineDto {
    @ApiProperty({
        description: 'The name of the medicine',
        example: 'Ibuprofen',
    })
=======
/**
 * DTO para la creación de un nuevo medicamento
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear un medicamento.
 * Utiliza class-validator para garantizar la integridad de los datos.
 * 
 * @export
 * @class CreateMedicineDto
 * 
 * @example
 * ```typescript
 * const newMedicine: CreateMedicineDto = {
 *   name: "Paracetamol",
 *   type: "tablet",
 *   presentation: "500mg",
 *   stock: 100,
 *   description: "Analgésico y antipirético",
 *   price: "5000"
 * };
 * ```
 */
export class CreateMedicineDto {

    /**
     * Nombre del medicamento
     * 
     * @type {string}
     * @description Nombre comercial o genérico del medicamento
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Ibuprofeno", "Amoxicilina"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 100)
    name: string;

<<<<<<< HEAD
    @ApiProperty({
        description: 'The type of the medicine',
        example: 'Analgesic',
    })
=======
    /**
     * Tipo del medicamento
     * 
     * @type {string}
     * @description Forma física de presentación del medicamento
     * @minLength 2
     * @maxLength 50
     * @required
     * 
     * @example "tablet", "pill", "liquid", "injection"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 50)
    type: string;

<<<<<<< HEAD
    @ApiProperty({
        description: 'The presentation of the medicine',
        example: 'Tablet',
    })
=======
    /**
     * Presentación del medicamento
     * 
     * @type {string}
     * @description Dosificación y cantidad del medicamento
     * @minLength 2
     * @maxLength 50
     * @required
     * 
     * @example "500mg", "100ml", "250mg/5ml"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 50)
    presentation: string;

<<<<<<< HEAD
    @ApiProperty({
        description: 'The stock of the medicine',
        example: 100,
    })
=======
    /**
     * Stock disponible del medicamento
     * 
     * @type {number}
     * @description Cantidad disponible en inventario
     * @minimum 0
     * @required
     * 
     * @example 100, 50, 200
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsInt()
    @Min(0)
    stock: number;

<<<<<<< HEAD
    @ApiProperty({
        description: 'A description of the medicine',
        example: 'Used to relieve pain and reduce inflammation.',
        required: false,
    })
=======
    /**
     * Descripción del medicamento
     * 
     * @type {string}
     * @description Información adicional sobre el medicamento, indicaciones o advertencias
     * @minLength 2
     * @maxLength 50
     * @optional
     * 
     * @example "Analgésico y antipirético para dolores leves a moderados"
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;

<<<<<<< HEAD
    @ApiProperty({
        description: 'The price of the medicine',
        example: 10.50,
    })
    @IsNumber()
=======
    /**
     * Precio del medicamento
     * 
     * @type {string}
     * @description Precio de venta por unidad del medicamento
     * @minimum 0
     * @required
     * 
     * @example "5000", "12500", "3000"
     */
    @IsInt()
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @Min(0)
    price: number;
}