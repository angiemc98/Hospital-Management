import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";

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
    @ApiProperty({ name: 'name', description: 'Name of the medicine', type: String, example: 'Ibuprofeno' })
    @IsString()
    @Length(2, 100)
    name: string;

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
    @ApiProperty({ name: 'type', description: 'Type of the medicine', type: String, example: 'tablet' })
    @IsString()
    @Length(2, 50)
    type: string;

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
    @ApiProperty({ name: 'presentation', description: 'Presentation of the medicine', type: String, example: '500mg' })
    @IsString()
    @Length(2, 50)
    presentation: string;

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
    @ApiProperty({ name: 'stock', description: 'Stock of the medicine', type: Number, example: 100 })
    @IsInt()
    @Min(0)
    stock: number;

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
    @ApiProperty({ name: 'description', description: 'Description of the medicine', type: String, example: 'Analgésico y antipirético para dolores leves a moderados' })
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;

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
    @ApiProperty({ name: 'price', description: 'Price of the medicine', type: Number, example: 5000 })
    @IsInt()
    @Min(0)
    price: number;
}