import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {ApiTags, ApiOperation,ApiResponse,ApiParam,
} from '@nestjs/swagger';
import { Doctor } from './doctor.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../person/person.entity';
/**
 * Controlador para gestionar las operaciones REST de doctores
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los doctores del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio DoctorService.
 * 
 * @route /doctor
 * @export
 * @class DoctorController
 */
@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  /**
   * Constructor del controlador de doctores
   * 
   * @param {DoctorService} doctorService - Servicio que maneja la lógica de negocio de doctores
   */
  constructor(private readonly doctorService: DoctorService) {}

  /**
   * Crea un nuevo doctor
   * 
   * @route POST /doctor
   * @param {CreateDoctorDto} dto - Datos del doctor a crear
   * @returns {Promise<Doctor>} El doctor creado con sus relaciones
   * 
   * @example
   * POST http://localhost:3000/doctor
   * Body:
   * ```json
   * {
   *   "personaId": 1,
   *   "specialtyId": 2,
   *   "licenseNumber": "MP-123456"
   * }
   * ```
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new doctor', description: 'Create a new doctor in the system hospital management and return the doctor' })
  @ApiResponse({
    status: 201,
    description: 'The doctor has been successfully created.',
    type: Doctor,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Doctor already exists.' })
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  /**
   * Obtiene todos los doctores
   * 
   * @route GET /doctor
   * @returns {Promise<Doctor[]>} Lista de todos los doctores con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/doctor
   */
  @Get()
  @ApiOperation({ summary: 'Get all doctors', description: 'Get all doctors registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all registered doctors.', type: [Doctor], isArray: true }) 
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  findAll() {
    return this.doctorService.findAll();
  }

  /**
   * Obtiene un doctor por su ID
   * 
   * @route GET /doctor/:id
   * @param {number} id - ID del doctor a buscar
   * @returns {Promise<Doctor>} El doctor encontrado con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/doctor/1
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single doctor by ID', description: 'Get a single doctor by its ID and return the doctor registered in the system' })
  @ApiParam({ name: 'id', description: 'The ID of the doctor', type: 'number', required: true, example: 1 })
  @ApiResponse({ status: 200, description: 'Doctor found.', type: Doctor, isArray: true })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  findOne(@Param(('id')) id: number) {
    return this.doctorService.findOne(+id);
  }

  /**
   * Actualiza un doctor existente
   * 
   * @route PATCH /doctor/:id
   * @param {number} id - ID del doctor a actualizar
   * @param {UpdateDoctorDto} dto - Datos actualizados del doctor
   * @returns {Promise<Doctor>} El doctor actualizado con sus relaciones
   * 
   * @example
   * PATCH http://localhost:3000/doctor/1
   * Body:
   * ```json
   * {
   *   "specialtyId": 3,
   *   "licenseNumber": "MP-789012"
   * }
   * ```
   */
  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an existing doctor', description: 'Update an existing doctor in the system hospital management and return the doctor' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the doctor to update',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully updated.',
    type: Doctor,
  })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

  /**
   * Elimina un doctor por su ID
   * 
   * @route DELETE /doctor/:id
   * @param {number} id - ID del doctor a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/doctor/1
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a doctor', description: 'Delete a doctor by its ID and return the message of confirmation' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the doctor to delete',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}