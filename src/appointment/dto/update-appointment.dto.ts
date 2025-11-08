import { IsDateString, IsInt, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';

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
    @IsString()
    notes: string;
}