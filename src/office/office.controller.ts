import { Controller, Patch, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Office } from './office.entity';

/**
 * Controlador para gestionar las operaciones REST de consultorios
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los consultorios. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio OfficeService.
 * 
 * @route /office
 * @export
 * @class OfficeController
 */
@ApiTags('office')
@Controller('office')
export class OfficeController {
  /**
   * Constructor del controlador de consultorios
   * 
   * @param {OfficeService} officeService - Servicio que maneja la lógica de negocio de consultorios
   */
  constructor(private readonly officeService: OfficeService) {}

  /**
   * Crea un nuevo consultorio
   * 
   * @route POST /office
   * @param {CreateOfficeDto} dto - Datos del consultorio a crear
   * @returns {Promise<Office>} El consultorio creado
   * 
   * @example
   * POST http://localhost:3000/office
   * Body:
   * ```json
   * {
   *   "num_consultorio": 101,
   *   "piso": 1,
   *   "disponible": true
   * }
   * ```
   */
  @Post()
  @ApiOperation({ summary: 'Create a new office' })
  @ApiResponse({ status: 201, description: 'The office has been successfully created.', type: Office })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() dto: CreateOfficeDto) {
    return this.officeService.create(dto);
  }

  /**
   * Obtiene todos los consultorios
   * 
   * @route GET /office
   * @returns {Promise<Office[]>} Lista de todos los consultorios con sus citas asociadas
   * 
   * @example
   * GET http://localhost:3000/office
   */
  /**
   * Obtiene todos los consultorios
   * 
   * @route GET /office
   * @returns {Promise<Office[]>} Lista de todos los consultorios con sus citas asociadas
   * 
   * @example
   * GET http://localhost:3000/office
   */
  @Get()
  @ApiOperation({ summary: 'Get all offices' })
  @ApiResponse({ status: 200, description: 'List of all offices with their associated appointments.', type: [Office] })
  findAll() {
    return this.officeService.findAll();
  }

  /**
   * Obtiene un consultorio por su ID
   * 
   * @route GET /office/:id
   * @param {number} id - ID del consultorio a buscar
   * @returns {Promise<Office>} El consultorio encontrado con sus citas
   * 
   * @example
   * GET http://localhost:3000/office/1
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an office by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the office to search for', type: Number })
  @ApiResponse({ status: 200, description: 'Office found with its appointments.', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }

  /**
   * Actualiza un consultorio existente
   * 
   * @route PATCH /office/:id
   * @param {number} id - ID del consultorio a actualizar
   * @param {UpdateOfficeDto} dto - Datos actualizados del consultorio
   * @returns {Promise<Office>} El consultorio actualizado
   * 
   * @example
   * PATCH http://localhost:3000/office/1
   * Body:
   * ```json
   * {
   *   "disponible": false,
   *   "piso": 2
   * }
   * ```
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing office' })
  @ApiParam({ name: 'id', description: 'ID of the office to update', type: Number })
  @ApiResponse({ status: 200, description: 'The office has been successfully updated.', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOfficeDto,
  ) {
    return this.officeService.update(id, dto);
  }

  /**
   * Elimina un consultorio por su ID
   * 
   * @route DELETE /office/:id
   * @param {number} id - ID del consultorio a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/office/1
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an office by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the office to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The office has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.remove(id);
  }

}