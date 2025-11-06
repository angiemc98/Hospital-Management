import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Doctor } from './doctor.entity';

<<<<<<< HEAD
@ApiTags('doctor')
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
@Controller('doctor')
export class DoctorController {
  /**
   * Constructor del controlador de doctores
   * 
   * @param {DoctorService} doctorService - Servicio que maneja la lógica de negocio de doctores
   */
  constructor(private readonly doctorService: DoctorService) {}

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'The doctor has been successfully created.', type: Doctor })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene todos los doctores
   * 
   * @route GET /doctor
   * @returns {Promise<Doctor[]>} Lista de todos los doctores con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/doctor
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'Return all doctors.', type: [Doctor] })
  findAll() {
    return this.doctorService.findAll();
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by id' })
  @ApiResponse({ status: 200, description: 'Return the doctor.', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found.'})
  findOne(@Param(('id')) id: number) {
    return this.doctorService.findOne(+id);
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Patch(':id')
  @ApiOperation({ summary: 'Update a doctor' })
  @ApiResponse({ status: 200, description: 'The doctor has been successfully updated.', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found.'})
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor' })
  @ApiResponse({ status: 200, description: 'The doctor has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Doctor not found.'})
  remove(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}