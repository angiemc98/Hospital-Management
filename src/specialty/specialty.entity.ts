import { Doctor } from "../doctor/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad que representa una especialidad médica en el sistema
 * 
 * @description
 * Esta entidad almacena la información de las especialidades médicas disponibles,
 * permitiendo la clasificación de los doctores según su área de especialización.
 * 
 * @export
 * @class Specialty
 * 
 * @example
 * ```typescript
 * const specialty = new Specialty();
 * specialty.name = "Cardiología";
 * specialty.descripcion = "Especialidad médica dedicada al estudio del corazón";
 * ```
 */
@Entity('especialidades')
export class Specialty {

    /**
     * Clave primaria de la especialidad
     * 
     * @type {number}
     * @description Identificador único autogenerado para la especialidad
     */
    @ApiProperty({ description: 'Primary key of the specialty', example: 1 })
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    /**
     * Nombre de la especialidad
     * 
     * @type {string}
     * @description Nombre de la especialidad médica, debe ser único
     * @minLength 2
     * @maxLength 100
     * @unique
     * @required
     * 
     * @example "Cardiología", "Pediatría", "Dermatología"
     */
    @ApiProperty({ description: 'Name of the specialty', example: 'Cardiology' })
    @Column({unique: true, length:100})
    name: string;

    /**
     * Descripción de la especialidad
     * 
     * @type {string}
     * @description Información adicional sobre la especialidad, sus campos de acción o características
     * @optional
     * 
     * @example "Especialidad dedicada al diagnóstico y tratamiento de enfermedades del corazón"
     */
    @ApiProperty({ description: 'Description of the specialty', example: 'Deals with disorders of the heart.' })
    @Column({nullable: true})
    descripcion: string;

    /**
     * Doctores asociados con esta especialidad
     * 
     * @type {Doctor[]}
     * @description Relación uno a muchos con la entidad Doctor.
     * Una especialidad puede tener múltiples doctores asociados.
     * @see {@link Doctor}
     */
    @ApiProperty({ type: () => [Doctor] })
    @OneToMany(() => Doctor, (doctor) => doctor.specialty)
    doctors: Doctor[];
}