import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";
import { Person } from "../person/person.entity";
import { Invoice } from "../invoice/invoice.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('patient')
export class Patient {

    @ApiProperty({ description: 'Primary key of the patient', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Blood type of the patient', example: 'O+' })
    @Column({type: 'varchar', length: 50})
    bloodType: string;

    @ApiProperty({ description: 'Insurance type of the patient', enum: ['contributive', 'subsidized', 'free'] })
    @Column({enum: ['contributive', 'subsidized', 'free']})
    insurance: string;

    @ApiProperty({ description: 'Medical history of the patient', example: 'Allergic to penicillin.' })
    @Column({type: 'text', nullable: true})
    medicalHistory: string;

    //Relationships

    @ApiProperty({ type: () => Person })
    @OneToOne(() => Person, (person) => person.patient, {cascade: true})
    @JoinColumn({name:'person_id'})
    person: Person;

    @ApiProperty({ type: () => [Appointment] })
    @OneToMany (() => Appointment, (appointment) => appointment.patient, {cascade: true})
    appointments: Appointment[];

    @ApiProperty({ type: () => [Invoice] })
    @OneToMany(() => Invoice, (invoice) => invoice.propety_patient, {cascade: true})
    invoices: Invoice[];
}