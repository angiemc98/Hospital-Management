import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Appointment } from "../appointment/appointment.entity";
import { Prescription } from "../prescription/prescription.entity";
import { Specialty } from "../specialty/specialty.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('doctor')
export class Doctor {

    @ApiProperty({ description: 'Id of the doctor', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'License number of the doctor', example: '12345-AB' })
    @Column(
        {length: 50, type: 'varchar'}
    )
    licenseNumber: string;

    //Relationships

    @ApiProperty({ type: () => Person })
    @OneToOne(() => Person, (person) => person.doctor, {cascade: true})
    @JoinColumn({name:'person_id'})
    person:Person;
    
    @ApiProperty({ type: () => Specialty })
    @ManyToOne(() => Specialty, (Especialidades) => Especialidades.propety_doctor, {cascade: true})
    @JoinColumn({name:'specialty_id'})
    specialty:Specialty; 

    @ApiProperty({ type: () => [Appointment] })
    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {cascade: true})
    appointments:Appointment[];
}