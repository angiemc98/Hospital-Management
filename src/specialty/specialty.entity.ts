// Importacion de la clase doctor para usar la entidad y hacer la relacion en la BD 
import { Doctor } from "../doctor/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('especialidades')
export class Specialty{

    // Primary key of the specialty
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    // Name of the specialty
    // Is required, length between 2 and 100
    // Unique
    @Column({unique: true, length:100})
    name: string;

   // Description of the specialty
   // Is optional
    @Column({nullable: true})
    description: string;

    //Relationships

   // Relation Doctor > Specialty, a Doctor can have many specialties
    @OneToMany(() => Doctor, (Doctor_Alias) => Doctor_Alias.specialty)
    propety_doctor: Doctor[];
}