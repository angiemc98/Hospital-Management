import { Doctor } from "src/doctor/doctor.entity";
/*import { Invoice } from "src/invoice/invoice.entity"; */
import { Patient } from "src/patient/patient.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { Office } from "src/office/office.entity";
import { Invoice } from "src/invoice/invoice.entity";
import { Prescription } from "src/prescription/prescription.entity";
import { ApiProperty } from "@nestjs/swagger"
import { Prescription } from "src/prescription/prescription.entity";

//Atributos entidad appointment
@Entity('appointment')
export class Appointment {
    
    @ApiProperty({ description: 'The unique identifier of the appointment', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'The date and time of the appointment', example: '2024-07-20T14:30:00Z' })
    @Column({type: 'timestamp'})
    date: Date;

    @ApiProperty({ description: 'The reason for the appointment', example: 'Regular check-up' })
    @Column({type: 'text', nullable: true})
    reason: string;

    @ApiProperty({ description: 'Additional notes for the appointment', example: 'Patient feels tired' })
    @Column({type: 'text', nullable: true})
    notes: string;

    @ApiProperty({ description: 'The status of the appointment', example: 'scheduled', enum: ['scheduled', 'completed', 'canceled'] })
    @Column({default: 'scheduled'})
    status: string; // scheduled, completed, canceled


    //Relationships

    // Relation Doctor > Appointment, a Doctor can have many appointments
    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    @JoinColumn({name: 'doctor_id'})
    doctor: Doctor;
    
    // Relation Patient > Appointment, a Patient can have many appointments
    @ManyToOne(() => Patient, patient => patient.appointments)
    @JoinColumn({name: 'patient_id'})
    patient: Patient;
    
    // Relation Office > Appointment, an Office can have many appointments
    @ManyToOne(() => Office, office => office.property_cita)
    @JoinColumn({name: 'office_id'})
    office: Office;
    
    // Relation Invoice > Appointment, an Invoice can have many appointments
    @OneToOne(() => Invoice, invoice => invoice.propety_cita)
    invoice: Invoice;

    // Relation Prescription > Appointment, an Prescription can have many appointments
    @OneToMany(() => Prescription, prescription => prescription.appointment)
    prescription: Prescription[];
    
}