import { IsDateString, IsInt, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO para la actualización de una cita médica existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una cita médica.
 * Extiende de CreateAppointmentDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateAppointmentDto
 * @extends {PartialType(CreateAppointmentDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo estado
 * const updateStatus: UpdateAppointmentDto = {
 *   status: "completed"
 * };
 * 
 * // Actualización de notas y estado
 * const updateNotes: UpdateAppointmentDto = {
 *   status: "completed",
 *   notes: "Consulta finalizada. Paciente en buen estado general."
 * };
 * 
 * // Reprogramación de cita
 * const reschedule: UpdateAppointmentDto = {
 *   date: new Date("2024-08-20T15:00:00Z"),
 *   officeId: 202,
 *   notes: "Cita reprogramada por solicitud del paciente"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateAppointmentDto = {
 *   date: new Date("2024-08-15T10:00:00Z"),
 *   reason: "Consulta de seguimiento",
 *   notes: "Control post-tratamiento",
 *   status: "scheduled",
 *   doctorId: 2,
 *   patientId: 5,
 *   officeId: 101
 * };
 * ```
 */
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {

    /**
     * ID del doctor asignado
     * 
     * @type {number}
     * @description Identificador actualizado del doctor que atenderá la cita
     * @optional
     * 
     * @example 1, 3, 5
     */
    @ApiProperty({ name: 'doctorId', description: 'ID of the doctor assigned', type: Number, example: 1 })
    @IsInt()
    doctorId: number;

    /**
     * ID del paciente
     * 
     * @type {number}
     * @description Identificador actualizado del paciente de la cita
     * @optional
     * 
     * @example 5, 10, 15
     */
    @ApiProperty({ name: 'patientId', description: 'ID of the patient', type: Number, example: 5 })
    @IsInt()
    patientId: number;  
    
    /**
     * ID del consultorio
     * 
     * @type {number}
     * @description Identificador actualizado del consultorio donde se realizará la cita
     * @optional
     * 
     * @example 101, 202, 305
     */
    @ApiProperty({ name: 'officeId', description: 'ID of the office', type: Number, example: 101 })
    @IsInt()
    officeId: number;
    
    /**
     * Estado de la cita
     * 
     * @type {string}
     * @description Estado actualizado de la cita médica
     * @optional
     * 
     * @example "scheduled" (programada), "completed" (completada), "canceled" (cancelada)
     */
    @ApiProperty({ name: 'status', description: 'Status of the appointment', type: String, example: 'scheduled' })
    @IsString()
    status: string;

    /**
     * Fecha y hora de la cita
     * 
     * @type {Date}
     * @description Fecha y hora actualizada para la cita médica en formato ISO 8601
     * @optional
     * 
     * @example "2024-08-15T10:00:00Z", "2024-12-20T14:30:00Z"
     */
    @ApiProperty({ name: 'date', description: 'Date and time of the appointment', type: Date, example: new Date('2024-08-15T10:00:00Z') })
    @IsDateString()
    date: Date;

    /**
     * Motivo de la cita
     * 
     * @type {string}
     * @description Razón actualizada por la cual el paciente solicita la cita médica
     * @optional
     * 
     * @example "Consulta de seguimiento", "Revisión de tratamiento", "Control post-operatorio"
     */
    @ApiProperty({ name: 'reason', description: 'Reason for the appointment', type: String, example: 'Consulta de seguimiento' })
    @IsString()
    reason: string;

    /**
     * Notas de la cita
     * 
     * @type {string}
     * @description Observaciones actualizadas o información adicional sobre la cita
     * @optional
     * 
     * @example "Paciente completó tratamiento satisfactoriamente", "Requiere estudios adicionales"
     */
    @ApiProperty({ name: 'notes', description: 'Notes for the appointment', type: String, example: 'Paciente completó tratamiento satisfactoriamente' })
    @IsString()
    notes: string;
}