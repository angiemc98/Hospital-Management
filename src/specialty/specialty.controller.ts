import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Specialty } from './specialty.entity';

<<<<<<< HEAD
@ApiTags('specialty')
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
@Controller('specialty')
export class SpecialtyController {
  /**
   * Constructor del controlador de especialidades
   * 
   * @param {SpecialtyService} specialtyService - Servicio que maneja la lógica de negocio de especialidades
   */
  constructor(private readonly specialtyService: SpecialtyService) {}

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Post()
  @ApiOperation({ summary: 'Create a new specialty' })
  @ApiResponse({ status: 201, description: 'The specialty has been successfully created.', type: Specialty })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene todas las especialidades médicas
   * 
   * @route GET /specialty
   * @returns {Promise<Specialty[]>} Lista de todas las especialidades con sus doctores asociados
   * 
   * @example
   * GET http://localhost:3000/specialty
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get()
  @ApiOperation({ summary: 'Get all specialties' })
  @ApiResponse({ status: 200, description: 'Return all specialties.', type: [Specialty] })
  findAll() {
    return this.specialtyService.findAll();
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get(':id')
  @ApiOperation({ summary: 'Get a specialty by id' })
  @ApiResponse({ status: 200, description: 'Return the specialty.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.findOne(id);
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully updated.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.delete(id);
  }
}