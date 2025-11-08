import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

/**
 * DTO para la creación de una nueva cita médica
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear una cita médica en el sistema.
 * Utiliza class-validator para garantizar la integridad de los datos.
 * Requiere que el doctor, paciente y consultorio ya estén registrados en el sistema.
 * 
 * @export
 * @class CreateAppointmentDto
 * 
 * @example
 * ```typescript
 * const newAppointment: CreateAppointmentDto = {
 *   date: new Date("2024-08-15T10:00:00Z"),
 *   reason: "Consulta de control",
 *   notes: "Paciente reporta mejoría en síntomas",
 *   status: "scheduled",
 *   doctorId: 1,
 *   patientId: 5,
 *   officeId: 101
 * };
 * ```
 */
export class CreateAppointmentDto {

    /**
     * Fecha y hora de la cita
     * 
     * @type {Date}
     * @description Fecha y hora programada para la cita médica en formato ISO 8601
     * @required
     * 
     * @example "2024-08-15T10:00:00Z", "2024-12-20T14:30:00Z"
     */
    @IsDateString()
    date: Date;

    /**
     * Motivo de la cita
     * 
     * @type {string}
     * @description Razón por la cual el paciente solicita la cita médica.
     * Es opcional si la cita no está programada.
     * @optional
     * 
     * @example "Consulta de control", "Revisión de exámenes", "Dolor abdominal", "Chequeo general"
     */
    @IsString()
    @IsOptional()
    reason?: string;

    /**
     * Notas de la cita
     * 
     * @type {string}
     * @description Observaciones adicionales o información relevante sobre la cita.
     * Es opcional si la cita no está programada.
     * @optional
     * 
     * @example "Paciente reporta dolores de cabeza leves", "Traer resultados de laboratorio previos"
     */
    @IsString()
    @IsOptional()
    notes?: string;

    /**
     * Estado de la cita
     * 
     * @type {string}
     * @description Estado actual de la cita médica.
     * Es opcional, se establece como 'scheduled' por defecto en el servicio.
     * @optional
     * @default "scheduled"
     * 
     * @example "scheduled" (programada), "completed" (completada), "canceled" (cancelada)
     */
    @IsString()
    @IsOptional()
    status?: string;

    /**
     * ID del doctor asignado
     * 
     * @type {number}
     * @description Identificador del doctor que atenderá la cita.
     * Debe corresponder a un doctor existente en el sistema.
     * @required
     * 
     * @example 1, 3, 5
     */
    @IsInt()
    doctorId: number;

    /**
     * ID del paciente
     * 
     * @type {number}
     * @description Identificador del paciente para quien se programa la cita.
     * Debe corresponder a un paciente existente en el sistema.
     * @required
     * 
     * @example 5, 10, 15
     */
    @IsInt()
    patientId: number;
    
    /**
     * ID del consultorio
     * 
     * @type {number}
     * @description Identificador del consultorio donde se realizará la cita.
     * Debe corresponder a un consultorio existente en el sistema.
     * @required
     * 
     * @example 101, 202, 305
     */
    @IsInt()
    officeId: number;
    
}