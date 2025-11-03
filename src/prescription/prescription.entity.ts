import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Medicine } from "src/medicine/medicine.entity";
import { PrescriptionDetail } from "src/prescription-detail/prescription-detail.entity";
import { Appointment } from "src/appointment/appointment.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('prescription')
export class Prescription {

    @ApiProperty({ description: 'Primary key of the prescription', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Date of the prescription', example: '2024-07-20T10:00:00Z' })
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @ApiProperty({ description: 'Observations of the prescription', example: 'Take with food.' })
    @Column({type: 'text', nullable: true})
    observations: string;

    @ApiProperty({ description: 'Quantity of the medicine', example: 30 })
    @Column({type: 'int', default: 0})
    quantity: number;

    @ApiProperty({ description: 'Duration of the treatment in days', example: 10 })
    @Column({type: 'int', default: 0})
    duration: number;

    // Relationships

    @ApiProperty({ type: () => Appointment })
    @ManyToOne(() => Appointment, appointment => appointment.prescription)
    @JoinColumn({name: 'appointment_id'})
    appointment: Appointment;

    @ApiProperty({ type: () => Medicine })
    @ManyToOne(() => Medicine, medicine => medicine.prescription)
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
    @ApiProperty({ type: () => [PrescriptionDetail] })
    @OneToMany(() => PrescriptionDetail, prescriptionDetail => prescriptionDetail.prescription)
    details: PrescriptionDetail[];
}