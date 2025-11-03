import { Doctor } from "../doctor/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('especialidades')
export class Specialty{

    @ApiProperty({ description: 'Primary key of the specialty', example: 1 })
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    @ApiProperty({ description: 'Name of the specialty', example: 'Cardiology' })
    @Column({unique: true, length:100})
    name: string;

    @ApiProperty({ description: 'Description of the specialty', example: 'Deals with disorders of the heart.' })
    @Column({nullable: true})
    description: string;

    //Relationships

    @ApiProperty({ type: () => [Doctor] })
    @OneToMany(() => Doctor, (Doctor_Alias) => Doctor_Alias.specialty)
    propety_doctor: Doctor[];
}