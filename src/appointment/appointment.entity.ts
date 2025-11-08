import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctor/doctor.entity';
// ... existing code ...
import { Prescription } from 'src/prescription/prescription.entity';
import { Patient } from 'src/patient/patient.entity';
import { Office } from 'src/office/office.entity';
import { Invoice } from 'src/invoice/invoice.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

/**
 * @class Appointment
 * @description Represents a medical appointment in the system.
 * @property {number} id - The unique identifier for the appointment.
 * @property {Date} date - The date and time of the appointment.
 * @property {string} reason - The reason for the appointment.
 * @property {string} notes - Any notes related to the appointment.
 * @property {string} status - The status of the appointment (e.g., scheduled, completed, canceled).
 * @property {Doctor} doctor - The doctor assigned to the appointment.
 * @property {Patient} patient - The patient for whom the appointment is scheduled.
 * @property {Office} office - The office where the appointment will take place.
 * @property {Invoice} invoice - The invoice associated with the appointment.
 * @property {Prescription[]} prescription - The prescriptions issued during the appointment.
 */
@Entity('appointment')
export class Appointment {
  @ApiProperty({
    description: 'The unique identifier for the appointment.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The date and time of the appointment.',
    example: '2024-08-15T10:00:00Z',
  })
  @Column({ type: 'timestamp' })
  date: Date;

  @ApiProperty({
    description: 'The reason for the appointment.',
    example: 'Regular check-up',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  reason: string;

  @ApiProperty({
    description: 'Any notes related to the appointment.',
    example: 'Patient reported mild headaches.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({
    description: 'The status of the appointment.',
    example: 'scheduled',
    default: 'scheduled',
    enum: ['scheduled', 'completed', 'canceled'],
  })
  @Column({ default: 'scheduled' })
  status: string; // scheduled, completed, canceled

  //Relationships

  @ApiProperty({ type: () => Doctor })
  // Relation Doctor > Appointment, a Doctor can have many appointments
  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ApiProperty({ type: () => Patient })
  // Relation Patient > Appointment, a Patient can have many appointments
  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ApiProperty({ type: () => Office })
  // Relation Office > Appointment, an Office can have many appointments
  @ManyToOne(() => Office, (office) => office.property_cita)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @ApiProperty({ type: () => Invoice, nullable: true })
  // Relation Invoice > Appointment, an Invoice can have many appointments
  @OneToOne(() => Invoice, (invoice) => invoice.propety_cita)
  invoice: Invoice;

  @ApiProperty({ type: () => [Prescription] })
  // Relation Prescription > Appointment, an Prescription can have many appointments
  @OneToMany(() => Prescription, (prescription) => prescription.appointment)
  prescription: Prescription[];
}