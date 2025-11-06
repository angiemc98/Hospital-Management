import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";
import { Person } from "../person/person.entity";
import { Invoice } from "../invoice/invoice.entity";
<<<<<<< HEAD
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
=======

/**
 * Entidad que representa un paciente en el sistema médico
 * 
 * @description
 * Esta entidad almacena la información clínica específica de los pacientes,
 * incluyendo tipo de sangre, tipo de seguro médico e historial médico.
 * Extiende la información personal almacenada en la entidad Person.
 * 
 * @export
 * @class Patient
 * 
 * @example
 * ```typescript
 * const patient = new Patient();
 * patient.bloodType = "O+";
 * patient.insurance = "contributive";
 * patient.medicalHistory = "Hipertensión controlada";
 * ```
 */
@Entity('patient')
export class Patient {

    /**
     * Clave primaria del paciente
     * 
     * @type {number}
     * @description Identificador único autogenerado para el paciente
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Tipo de sangre del paciente
     * 
     * @type {string}
     * @description Grupo sanguíneo del paciente (A+, A-, B+, B-, AB+, AB-, O+, O-)
     * @maxLength 50
     * @required
     * 
     * @example "O+", "A-", "AB+", "B-"
     */
    @Column({type: 'varchar', length: 50})
    bloodType: string;

    /**
     * Tipo de seguro médico del paciente
     * 
     * @type {string}
     * @description Régimen de afiliación al sistema de salud
     * @required
     * @enum ['contributive', 'subsidized', 'free']
     * 
     * @example "contributive" (régimen contributivo), "subsidized" (régimen subsidiado), "free" (sin seguro)
     */
    @Column({enum: ['contributive', 'subsidized', 'free']})
    insurance: string;

    /**
     * Historial médico del paciente
     * 
     * @type {string}
     * @description Registro de condiciones médicas previas, alergias, cirugías y tratamientos
     * @optional
     * 
     * @example "Hipertensión controlada, alergia a la penicilina, apendicectomía en 2015"
     */
    @Column({type: 'text', nullable: true})
    medicalHistory: string;

    /**
     * Persona asociada con este paciente
     * 
     * @type {Person}
     * @description Relación uno a uno con la entidad Person.
     * Contiene la información personal básica del paciente (nombre, documento, contacto, etc.).
     * La clave foránea person_id se almacena en la tabla patient.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Person}
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @OneToOne(() => Person, (person) => person.patient, {cascade: true})
    @JoinColumn({name:'person_id'})
    person: Person;

<<<<<<< HEAD
    @ApiProperty({ type: () => [Appointment] })
    @OneToMany (() => Appointment, (appointment) => appointment.patient, {cascade: true})
    appointments: Appointment[];

    @ApiProperty({ type: () => [Invoice] })
=======
    /**
     * Citas asociadas con este paciente
     * 
     * @type {Appointment[]}
     * @description Relación uno a muchos con la entidad Appointment.
     * Un paciente puede tener múltiples citas médicas programadas.
     * La clave foránea patient_id se define en la tabla appointment.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Appointment}
     */
    @OneToMany (() => Appointment, (appointment) => appointment.patient, {cascade: true})
    @JoinColumn({name: 'patient_id'})
    appointments: Appointment[];

    /**
     * Facturas asociadas con este paciente
     * 
     * @type {Invoice[]}
     * @description Relación uno a muchos con la entidad Invoice.
     * Un paciente puede tener múltiples facturas por servicios médicos recibidos.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Invoice}
     */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
    @OneToMany(() => Invoice, (invoice) => invoice.propety_patient, {cascade: true})
    invoices: Invoice[];
}