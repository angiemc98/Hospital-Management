import { Appointment } from "src/appointment/appointment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "src/patient/patient.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('factura')
export class Invoice {
    @ApiProperty({ description: 'Primary key of the invoice', example: 1 })
    @PrimaryGeneratedColumn()
    id_factura: number;

    @ApiProperty({ description: 'Date of the invoice', example: '2024-07-20T10:00:00Z' })
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;

    @ApiProperty({ description: 'Amount of the invoice', example: 150.75 })
    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    @ApiProperty({ description: 'Payment method of the invoice', example: 'Credit Card' })
    @Column({type: 'varchar', length: 50})
    metodo_pago: string;

    @ApiProperty({ description: 'Status of the invoice', example: 'Paid', default: 'Pendiente' })
    @Column({type: 'varchar', length: 50, default: 'Pendiente'})
    estado_pago: string;

    //Relationships

    @ApiProperty({ type: () => Appointment })
    @ManyToOne(() => Appointment, (Cita) => Cita.invoice, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_cita'})
    propety_cita: Appointment;

    @ApiProperty({ type: () => Patient })
    @ManyToOne(() => Patient, (paciente) => paciente.invoices, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_paciente'})
    propety_patient: Patient;
}