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

<<<<<<< HEAD
    @ApiProperty({ description: 'Primary key of the medicine', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Name of the medicine', example: 'Ibuprofen' })
    @Column({type: 'varchar', length: 100})
    name: string;

    @ApiProperty({ description: 'Type of the medicine (e.g., tablet, pill, liquid)', example: 'tablet' })
=======
    /**
     * Clave primaria del medicamento
     * 
     * @type {number}
     * @description Identificador único autogenerado para el medicamento
     */
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @Column({type: 'varchar', length: 50})
    type: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Presentation of the medicine (e.g., 500mg, 100ml)', example: '500mg' })
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @Column({type: 'varchar', length: 50})
    presentation: string;

<<<<<<< HEAD
    @ApiProperty({ description: 'Stock of the medicine', example: 100 })
    @Column({type: 'int', default: 0})
    stock: number;

    @ApiProperty({ description: 'Description of the medicine', example: 'Used to relieve pain.' })
    @Column({type: 'text', nullable: true})
    description: string;

    @ApiProperty({ description: 'Price of the medicine', example: 10.50 })
    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    //Relationships

    @ApiProperty({ type: () => [Prescription] })
    @OneToMany(() => Prescription, (prescription) => prescription.medicine)
    prescription: Prescription[];
    
    @ApiProperty({ type: () => [PrescriptionDetail] })
=======
    /**
     * Stock del medicamento
     * 
     * @type {number}
     * @description Cantidad disponible actual en el inventario
     * @default 0
     * @required
     */
    @Column({type: 'int', default: 0})
    stock: number;

    /**
     * Descripción del medicamento
     * 
     * @type {string}
     * @description Información adicional sobre el medicamento, uso o advertencias
     * @optional
     */
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @OneToMany(() => PrescriptionDetail, (prescription) => prescription.medicine)
    details: PrescriptionDetail[];
    
}