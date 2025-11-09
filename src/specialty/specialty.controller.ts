import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Specialty } from './specialty.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../person/person.entity';

/**
 * Controlador para gestionar las operaciones REST de especialidades médicas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las especialidades médicas. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio SpecialtyService.
 * 
 * @route /specialty
 * @export
 * @class SpecialtyController
 */
@ApiTags('specialty')
@Controller('specialty')
export class SpecialtyController {
  /**
   * Constructor del controlador de especialidades
   * 
   * @param {SpecialtyService} specialtyService - Servicio que maneja la lógica de negocio de especialidades
   */
  constructor(private readonly specialtyService: SpecialtyService) {}

  /**
   * Crea una nueva especialidad médica
   * 
   * @route POST /specialty
   * @param {CreateSpecialtyDto} dto - Datos de la especialidad a crear
   * @returns {Promise<Specialty>} La especialidad creada
   * 
   * @example
   * POST http://localhost:3000/specialty
   * Body:
   * ```json
   * {
   *   "name": "Cardiología",
   *   "description": "Especialidad médica dedicada al estudio del corazón"
   * }
   * ```
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new medical specialty', description: 'Create a new medical specialty in the system hospital management and return the specialty' })
  @ApiResponse({ status: 201, description: 'The specialty has been successfully created.', type: Specialty })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Specialty already exists.' })
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  /**
   * Obtiene todas las especialidades médicas
   * 
   * @route GET /specialty
   * @returns {Promise<Specialty[]>} Lista de todas las especialidades con sus doctores asociados
   * 
   * @example
   * GET http://localhost:3000/specialty
   */
  @Get()
  @ApiOperation({ summary: 'Get all medical specialties', description: 'Get all medical specialties registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all specialties with their associated doctors.', type: [Specialty] })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Specialty not found.' })
  findAll() {
    return this.specialtyService.findAll();
  }

  /**
   * Obtiene una especialidad por su ID
   * 
   * @route GET /specialty/:id
   * @param {number} id - ID de la especialidad a buscar
   * @returns {Promise<Specialty>} La especialidad encontrada
   * 
   * @example
   * GET http://localhost:3000/specialty/1
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a specialty by its ID', description: 'Get a specialty by its ID and return the specialty registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the specialty to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Specialty found.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.specialtyService.findOne(id);
    }

  /**
   * Actualiza una especialidad existente
   * 
   * @route PATCH /specialty/:id
   * @param {number} id - ID de la especialidad a actualizar
   * @param {UpdateSpecialtyDto} dto - Datos actualizados de la especialidad
   * @returns {Promise<Specialty>} La especialidad actualizada
   * 
   * @example
   * PATCH http://localhost:3000/specialty/1
   * Body:
   * ```json
   * {
   *   "name": "Cardiología Intervencionista",
   *   "description": "Especialidad avanzada del corazón con procedimientos invasivos"
   * }
   * ```
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing specialty', description: 'Update an existing specialty in the system hospital management and return the specialty' })
  @ApiParam({ name: 'id', description: 'ID of the specialty to update', type: Number , required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully updated.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  /**
   * Elimina una especialidad por su ID
   * 
   * @route DELETE /specialty/:id
   * @param {number} id - ID de la especialidad a eliminar
   * @returns {Promise<void>}
   * 
   * @example
   * DELETE http://localhost:3000/specialty/1
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialty by its ID', description: 'Delete a specialty by its ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the specialty to delete', type: Number , required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Specialty not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  delete(@Body('id') id: number) {
    return this.specialtyService.delete(+id);
  }
}