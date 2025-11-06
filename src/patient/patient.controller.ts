import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

<<<<<<< HEAD
@ApiTags('patient')
=======
/**
 * Controlador para gestionar las operaciones REST de pacientes
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los pacientes del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio PatientService.
 * 
 * @route /patient
 * @export
 * @class PatientController
 */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
@Controller('patient')
export class PatientController {
  /**
   * Constructor del controlador de pacientes
   * 
   * @param {PatientService} patientService - Servicio que maneja la lógica de negocio de pacientes
   */
  constructor(private readonly patientService: PatientService) {}
  
<<<<<<< HEAD
=======
  /**
   * Crea un nuevo paciente
   * 
   * @route POST /patient
   * @param {CreatePatientDto} patientDto - Datos del paciente a crear
   * @returns {Promise<Patient>} El paciente creado con sus datos personales
   * 
   * @example
   * POST http://localhost:3000/patient
   * Body:
   * ```json
   * {
   *   "personId": 1,
   *   "bloodType": "O+",
   *   "insurance": "contributive",
   *   "medicalHistory": "Hipertensión controlada, alergia a la penicilina"
   * }
   * ```
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'The patient has been successfully created.', type: Patient })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.createPatient(patientDto);
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene todos los pacientes
   * 
   * @route GET /patient
   * @returns {Promise<Patient[]>} Lista de todos los pacientes con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/patient
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients.', type: [Patient] })
  findAll() {
    return this.patientService.findAll();
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene un paciente por su ID
   * 
   * @route GET /patient/:id
   * @param {number} id - ID del paciente a buscar
   * @returns {Promise<Patient>} El paciente encontrado con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/patient/1
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id' })
  @ApiResponse({ status: 200, description: 'Return the patient.', type: Patient })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

<<<<<<< HEAD
=======
  /**
   * Actualiza un paciente existente
   * 
   * @route PATCH /patient/:id
   * @param {number} id - ID del paciente a actualizar
   * @param {UpdatePatientDto} patientDto - Datos actualizados del paciente
   * @returns {Promise<Patient>} El paciente actualizado
   * 
   * @example
   * PATCH http://localhost:3000/patient/1
   * Body:
   * ```json
   * {
   *   "bloodType": "A+",
   *   "insurance": "subsidized",
   *   "medicalHistory": "Hipertensión controlada, diabetes tipo 2"
   * }
   * ```
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully updated.', type: Patient })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() patientDto: UpdatePatientDto) {
    return this.patientService.update(id, patientDto);
  }

<<<<<<< HEAD
=======
  /**
   * Elimina un paciente por su ID
   * 
   * @route DELETE /patient/:id
   * @param {number} id - ID del paciente a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/patient/1
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}