import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { Medicine } from "src/medicine/medicine.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('prescription_detail')
export class PrescriptionDetail {
    
    @ApiProperty({ description: 'Primary key of the prescription detail', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ description: 'Dose of the prescription', example: '1 tablet' })
    @Column({length: 100})
    dose: string;

    @ApiProperty({ description: 'Duration of the prescription in days', example: 7 })
    @Column({type: 'int'})
    duration: number;

    @ApiProperty({ description: 'Instructions for the prescription', example: 'Take one tablet every 8 hours.' })
    @Column({type: 'text'})
    instructions: string;

    //Relationships

    @ApiProperty({ type: () => Prescription })
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { Medicine } from "src/medicine/medicine.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('prescription_detail')
export class PrescriptionDetail {
    
    @ApiProperty({ description: 'Primary key of the prescription detail', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ description: 'Dose of the prescription', example: '1 tablet' })
    @Column({length: 100})
    dose: string;

    @ApiProperty({ description: 'Duration of the prescription in days', example: 7 })
    @Column({type: 'int'})
    duration: number;

    @ApiProperty({ description: 'Instructions for the prescription', example: 'Take one tablet every 8 hours.' })
    @Column({type: 'text'})
    instructions: string;

    //Relationships

    @ApiProperty({ type: () => Prescription })
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { Medicine } from "src/medicine/medicine.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('prescription_detail')
export class PrescriptionDetail {
    
    @ApiProperty({ description: 'Primary key of the prescription detail', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ description: 'Dose of the prescription', example: '1 tablet' })
    @Column({length: 100})
    dose: string;

    @ApiProperty({ description: 'Duration of the prescription in days', example: 7 })
    @Column({type: 'int'})
    duration: number;

    @ApiProperty({ description: 'Instructions for the prescription', example: 'Take one tablet every 8 hours.' })
    @Column({type: 'text'})
    instructions: string;

    //Relationships

    @ApiProperty({ type: () => Prescription })
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}