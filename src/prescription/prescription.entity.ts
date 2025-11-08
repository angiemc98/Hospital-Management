import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Medicine } from "src/medicine/medicine.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";
import { Appointment } from "src/appointment/appointment.entity";


@Entity('prescription')
export class Prescription {

    // Primary key of the prescription
      @ApiProperty({
        description: 'Unique identifier for the prescription',
        example: 1,
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    // Date of the prescription
       @ApiProperty({
        description: 'The date the prescription was issued',
        example: '2023-10-27T10:00:00Z',
        default: 'CURRENT_TIMESTAMP',
    })
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    // Observations of the prescription
      @ApiProperty({
        description: 'Additional observations or instructions for the prescription',
        example: 'Take with food.',
        required: false,
    })
    @Column({type: 'text', nullable: true})
    observations: string;

    // Quantity of the prescription of medicine
    @ApiProperty({
        description: 'The quantity of medicine prescribed',
        example: 30,
        default: 0,
    })
    @Column({type: 'int', default: 0})
    quantity: number;

    // Duration of the prescription
    @ApiProperty({
        description: 'The duration in days for which the medicine should be taken',
        example: 15,
        default: 0,
    })
    @Column({type: 'int', default: 0})
    duration: number;

    // Relationships

    // Relation Appointment > Prescription, an Appointment can have many prescriptions
    @ApiProperty({ type: () => Appointment })
    @ManyToOne(() => Appointment, appointment => appointment.prescription)
    // foreign key appointment_id JoinColumn = Define the name of the foreign key column in the prescription table
    @JoinColumn({name: 'appointment_id'})
    appointment: Appointment;

    // Relation Medicine > Prescription, a Medicine can have many prescriptions
    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, medicine => medicine.prescription)
    // foreign key medicine_id JoinColumn = Define the name of the foreign key column in the prescription table
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
    // Relation PrescriptionDetail > Prescription, a PrescriptionDetail can have many prescriptions
    @ApiProperty({ type: () => [PrescriptionDetail] })
    @OneToMany(() => PrescriptionDetail, prescriptionDetail => prescriptionDetail.prescription)
    details: PrescriptionDetail[];
}
