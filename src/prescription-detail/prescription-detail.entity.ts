import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { Medicine } from "src/medicine/medicine.entity";


@Entity('prescription_detail')
export class PrescriptionDetail {
    
    // Primary key of the prescription detail
    @ApiProperty({
        description: 'Unique identifier for the prescription detail',
        example: 1,
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id: number;
    
    // Dose of the prescription 
    @ApiProperty({
        description: 'The prescribed dose of the medicine',
        example: '1 tablet every 8 hours',
        maxLength: 100,
    })
    @Column({length: 100})
    dose: string;

    // Duration of the prescription 
    @ApiProperty({
        description: 'The duration in days for which the medicine should be taken',
        example: 7,
    })
    @Column({type: 'int'})
    duration: number;

    // Instructions of the prescription 
    @ApiProperty({
        description: 'Special instructions for taking the medicine',
        example: 'Take with a full glass of water. Avoid dairy products.',
    })
    @Column({type: 'text'})
    instrucitons: string;

    //Relationships

    // Relation Prescription > PrescriptionDetail, a PrescriptionDetail can have many prescriptions
    @ApiProperty({ type: () => Prescription })
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    // foreign key prescription_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    // Relation Medicine > PrescriptionDetail, a Medicine can have many prescription details
    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    // foreign key medicine_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}