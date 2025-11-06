import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Specialty } from './specialty.entity';

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
   */
  @Post()
  @ApiOperation({ summary: 'Create a new specialty' })
  @ApiResponse({ status: 201, description: 'The specialty has been successfully created.', type: Specialty })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  /**
   * Obtiene todas las especialidades médicas
   * 
   * @route GET /specialty
   * @returns {Promise<Specialty[]>} Lista de todas las especialidades con sus doctores asociados
   */
  @Get()
  @ApiOperation({ summary: 'Get all specialties' })
  @ApiResponse({ status: 200, description: 'Return all specialties.', type: [Specialty] })
  findAll() {
    return this.specialtyService.findAll();
  }

  /**
   * Obtiene una especialidad por su ID
   * 
   * @route GET /specialty/:id
   * @param {number} id - ID de la especialidad a buscar
   * @returns {Promise<Specialty>} La especialidad encontrada
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a specialty by id' })
  @ApiResponse({ status: 200, description: 'Return the specialty.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.findOne(id);
  }

  /**
   * Actualiza una especialidad existente
   * 
   * @route PATCH /specialty/:id
   * @param {number} id - ID de la especialidad a actualizar
   * @param {UpdateSpecialityDto} dto - Datos actualizados de la especialidad
   * @returns {Promise<Specialty>} La especialidad actualizada
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully updated.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialityDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  /**
   * Elimina una especialidad por su ID
   * 
   * @route DELETE /specialty/:id
   * @param {number} id - ID de la especialidad a eliminar
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.delete(id);
  }
}