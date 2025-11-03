import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('medicine')
export class Medicine {

    @ApiProperty({ description: 'Primary key of the medicine', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Name of the medicine', example: 'Ibuprofen' })
    @Column({type: 'varchar', length: 100})
    name: string;

    @ApiProperty({ description: 'Type of the medicine (e.g., tablet, pill, liquid)', example: 'tablet' })
    @Column({type: 'varchar', length: 50})
    type: string;

    @ApiProperty({ description: 'Presentation of the medicine (e.g., 500mg, 100ml)', example: '500mg' })
    @Column({type: 'varchar', length: 50})
    presentation: string;

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
    @OneToMany(() => PrescriptionDetail, (prescription) => prescription.medicine)
    details: PrescriptionDetail[];
    
}