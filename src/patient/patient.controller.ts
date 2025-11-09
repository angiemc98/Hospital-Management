import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {ApiTags,ApiOperation, ApiResponse,ApiParam, }from '@nestjs/swagger';
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
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  /**
   * Constructor del controlador de pacientes
   * 
   * @param {PatientService} patientService - Servicio que maneja la lógica de negocio de pacientes
   */
  constructor(private readonly patientService: PatientService) {}
  
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
  @Post()
   @Post()
  @ApiOperation({ summary: 'Create a new patient', description: 'Create a new patient in the system hospital management and return the patient' })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created.',
    type: Patient,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Patient already exists.' })
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.create(patientDto);
  }

  /**
   * Obtiene todos los pacientes
   * 
   * @route GET /patient
   * @returns {Promise<Patient[]>} Lista de todos los pacientes con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/patient
   */
  @Get()
  @ApiOperation({ summary: 'Get all patients', description: 'Get all patients registered in the system and return a list of them' })
  @ApiResponse({
    status: 200,
    description: 'Return all patients.',
    type: [Patient],
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  findAll() {
    return this.patientService.findAll();
  }

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
  @Get(':id')
  @ApiOperation({ summary: 'Get a single patient by ID', description: 'Get a single patient by its ID and return the patient registered in the system' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the patient',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the patient.',
    type: Patient,
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(+id);
  }

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
  @Patch(':id')
   @ApiOperation({ summary: 'Update an existing patient', description: 'Update an existing patient in the system hospital management and return the patient' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the patient to update',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully updated.',
    type: Patient,
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id') id: number,
     @Body() patientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(+id, patientDto);
  }

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
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient', description: 'Delete a patient by its ID and return the message of confirmation' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the patient to delete',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id') id: number) {
    return this.patientService.remove(+id);
  }
}