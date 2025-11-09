import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";

/**
 * DTO para la actualización de un paciente existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar la información clínica de un paciente.
 * Permite actualizar el tipo de sangre, seguro médico e historial médico.
 * 
 * @export
 * @class UpdatePatientDto
 * 
 * @example
 * ```typescript
 * // Actualización de datos clínicos
 * const updateData: UpdatePatientDto = {
 *   personid: 1,
 *   bloodType: "A+",
 *   insurance: "subsidized",
 *   medicalHistory: "Hipertensión controlada, diabetes tipo 2 diagnosticada en 2024"
 * };
 * ```
 */
export class UpdatePatientDto {

    /**
     * ID de la persona asociada al paciente
     * 
     * @type {number}
     * @description Identificador de la persona en el sistema
     * @required
     * 
     * @example 1, 5, 10
     */
    @ApiProperty({ name: 'personid', description: 'ID of the patient', type: Number, example: 1 })
    @IsInt()
    @IsNotEmpty()
    personid: number;

    /**
     * Tipo de sangre del paciente
     * 
     * @type {string}
     * @description Grupo sanguíneo del paciente según clasificación ABO y factor Rh
     * @minLength 2
     * @maxLength 10
     * @required
     * 
     * @example "O+", "A-", "AB+", "B-", "O-", "A+", "AB-", "B+"
     */
    @ApiProperty({ name: 'bloodType', description: 'Blood type of the patient', type: String, example: 'O+' })
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    bloodType?: string;

    /**
     * Tipo de seguro médico del paciente
     * 
     * @type {string}
     * @description Régimen de afiliación al sistema de salud del paciente
     * @required
     * 
     * @example "contributive" (régimen contributivo), "subsidized" (régimen subsidiado), "free" (sin seguro)
     */
    @ApiProperty({ name: 'insurance', description: 'Insurance type of the patient', type: String, example: 'contributive' })
    @IsString()
    @IsNotEmpty()
    insurance?: string;

    /**
     * Historial médico del paciente
     * 
     * @type {string}
     * @description Registro actualizado de condiciones médicas, alergias, cirugías, tratamientos y medicamentos
     * @required
     * 
     * @example "Hipertensión controlada desde 2018, diabetes tipo 2 diagnosticada en 2024, alergia a la penicilina"
     */
    @ApiProperty({ name: 'medicalHistory', description: 'Medical history of the patient', type: String, example: 'Nombre: José Luis, Edad: 30 años, Sexo: Masculino, Fecha de nacimiento: 1990-05-15, Teléfono: 3001234567, Correo electrónico: john@example.com, Tipo de sangre: O+, Tipo de seguro médico: contributive, Historial médico: Hipertensión controlada desde 2018, diabetes tipo 2 diagnosticada en 2024, alergia a la penicilina' })
    @IsString()
    @IsNotEmpty()
    medicalHistory: string;
}