import { Appointment } from "src/appointment/appointment.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('consultorio')
export class Office{
    @ApiProperty({ description: 'Primary key of the office', example: 1 })
    @PrimaryGeneratedColumn()
    id_consultorio: number;
    
    @ApiProperty({ description: 'Number of the office', example: 101 })
    @Column({unique: true})
    num_consultorio: number;

    @ApiProperty({ description: 'Floor number of the office', example: 1 })
    @Column()
    piso: number;

    @ApiProperty({ description: 'Availability of the office', example: true })
    @Column({type: 'boolean', default: true})
    disponible: boolean

    //Relationships

    @ApiProperty({ type: () => [Appointment] })
    @OneToMany(() => Appointment, (Cita) => Cita.office, {cascade: true})
    property_cita: Appointment[];
}