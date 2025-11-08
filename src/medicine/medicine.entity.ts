import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad que representa un medicamento en el sistema
 * 
 * @description
 * Esta entidad almacena la información de los medicamentos disponibles en la farmacia,
 * incluyendo su tipo, presentación, stock y precio.
 * 
 * @example
 * ```typescript
 * const medicine = new Medicine();
 * medicine.name = "Paracetamol";
 * medicine.type = "tablet";
 * medicine.presentation = "500mg";
 * medicine.stock = 100;
 * medicine.price = "5000";
 * ```
 */
@Entity('medicine')
export class Medicine {

    /**
     * Clave primaria del medicamento
     * 
     * @type {number}
     * @description Identificador único autogenerado para el medicamento
     */
    @ApiProperty({
        description: 'Unique identifier for the medicine',
        example: 1,
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Nombre del medicamento
     * 
     * @type {string}
     * @description Nombre comercial o genérico del medicamento
     * @minLength 2
     * @maxLength 100
     * @required
     */
     @ApiProperty({
        description: 'Commercial or generic name of the medicine',
        example: 'Paracetamol',
        minLength: 2,
        maxLength: 100,
    })
    @Column({type: 'varchar', length: 100})
    name: string;

    /**
     * Tipo del medicamento
     * 
     * @type {string}
     * @description Forma física en la que se presenta el medicamento
     * @minLength 2
     * @maxLength 50
     * @required
     * @example "tablet", "pill", "liquid", "injection"
     */
     @ApiProperty({
        description: 'Physical form of the medicine',
        example: 'tablet',
        minLength: 2,
        maxLength: 50,
    })
    @Column({type: 'varchar', length: 50})
    type: string; //tablet, pill, liquid, injection

    /**
     * Presentación del medicamento
     * 
     * @type {string}
     * @description Información sobre la dosificación y cantidad del medicamento
     * @minLength 2
     * @maxLength 50
     * @required
     * @example "500mg", "100ml", "250mg/5ml"
     */
    @ApiProperty({
        description: 'Dosage and quantity information of the medicine',
        example: '500mg',
        minLength: 2,
        maxLength: 50,
    })
    @Column({type: 'varchar', length: 50})
    presentation: string; // 500mg, 100ml, etc

    /**
     * Stock del medicamento
     * 
     * @type {number}
     * @description Cantidad disponible actual en el inventario
     * @default 0
     * @required
     */
    @ApiProperty({
        description: 'Current available quantity in inventory',
        example: 100,
        default: 0,
    })
    @Column({type: 'int', default: 0})
    stock: number;

    /**
     * Descripción del medicamento
     * 
     * @type {string}
     * @description Información adicional sobre el medicamento, uso o advertencias
     * @optional
     */
    @ApiProperty({
        description: 'Additional information about the medicine, usage or warnings',
        required: false,
    })
    @Column({type: 'text', nullable: true})
    description: string;

    /**
     * Precio del medicamento
     * 
     * @type {string}
     * @description Precio de venta por unidad del medicamento
     * @minLength 2
     * @maxLength 50
     * @required
     */
    @ApiProperty({
        description: 'Sale price per unit of the medicine',
        example: '5000',
        minLength: 2,
        maxLength: 50,
    })
    @Column({type: 'varchar', length: 50})
    price: number;

    /**
     * Prescripciones asociadas con este medicamento
     * 
     * @type {Prescription[]}
     * @description Relación uno a muchos con la entidad Prescription.
     * Un medicamento puede estar incluido en múltiples prescripciones.
     * @see {@link Prescription}
     */
    @ApiProperty({ type: () => [Prescription] })
    @OneToMany(() => Prescription, (prescription) => prescription.medicine)
    prescription: Prescription[];
    
    /**
     * Detalles de prescripción asociados con este medicamento
     * 
     * @type {PrescriptionDetail[]}
     * @description Relación uno a muchos con la entidad PrescriptionDetail.
     * Un medicamento puede aparecer en múltiples detalles de prescripción.
     * @see {@link PrescriptionDetail}
     */
    @ApiProperty({ type: () => [PrescriptionDetail] })
    @OneToMany(() => PrescriptionDetail, (prescription) => prescription.medicine)
    details: PrescriptionDetail[];
    
}