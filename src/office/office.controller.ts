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
  @ApiOperation({ summary: 'Create a new office', description: 'Create a new office in the system hospital management and return the office' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 201, description: 'Office created successfully.' })
  @ApiResponse({ status: 409, description: 'Office already exists.' })
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
  @ApiOperation({ summary: 'Get all offices', description: 'Get all offices registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all offices with their associated appointments.', type: [Office] })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Office not found.' })
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
  @ApiOperation({ summary: 'Get an office by its ID', description: 'Get an office by its ID and return the office registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the office to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Office found with its appointments.', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @ApiOperation({ summary: 'Update an existing office', description: 'Update an existing office in the system hospital management and return the office' })
  @ApiParam({ name: 'id', description: 'ID of the office to update', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The office has been successfully updated.', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @ApiOperation({ summary: 'Delete an office by its ID', description: 'Delete an office by its ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the office to delete', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The office has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Office not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.remove(id);
  }

}