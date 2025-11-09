import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Medicine } from './medicine.entity';

/**
 * Controlador para gestionar las operaciones REST de medicamentos
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los medicamentos. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio MedicineService.
 * 
 * @route /medicine
 * @export
 * @class MedicineController
 */
@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  /**
   * Constructor del controlador de medicamentos
   * 
   * @param {MedicineService} medicineService - Servicio que maneja la lógica de negocio de medicamentos
   */
  constructor(private readonly medicineService: MedicineService) {}

  /**
   * Crea un nuevo medicamento
   * 
   * @route POST /medicine
   * @param {CreateMedicineDto} createMedicineDto - Datos del medicamento a crear
   * @returns {Promise<Medicine>} El medicamento creado
   * 
   * @example
   * POST http://localhost:3000/medicine
   * Body:
   * ```json
   * {
   *   "name": "Paracetamol",
   *   "type": "tablet",
   *   "presentation": "500mg",
   *   "stock": 100,
   *   "price": "5000"
   * }
   * ```
   */
  @Post()
  @ApiOperation({ summary: 'Create a new medicine', description: 'Create a new medicine in the system hospital management and return the medicine' })
  @ApiResponse({ status: 201, description: 'The medicine has been successfully created.', type: Medicine })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Medicine already exists.' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

  /**
   * Obtiene todos los medicamentos
   * 
   * @route GET /medicine
   * @returns {Promise<Medicine[]>} Lista de todos los medicamentos registrados
   * 
   * @example
   * GET http://localhost:3000/medicine
   */
  @Get()
  @ApiOperation({ summary: 'Get all medicines' , description: 'Get all medicines registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all registered medicines.', type: [Medicine], isArray: true }) 
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  findAll() {
    return this.medicineService.findAll();
  }

  /**
   * Obtiene un medicamento por su ID
   * 
   * @route GET /medicine/:id
   * @param {string} id - ID del medicamento a buscar
   * @returns {Promise<Medicine>} El medicamento encontrado
   * 
   * @example
   * GET http://localhost:3000/medicine/1
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a medicine by its ID', description: 'Get a medicine by its ID and return the medicine registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the medicine to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Medicine found.', type: Medicine, isArray: true, })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  findOne(@Param('id') id: number) {
    return this.medicineService.findOne(+id);
  }

  /**
   * Actualiza un medicamento existente
   * 
   * @route PATCH /medicine/:id
   * @param {string} id - ID del medicamento a actualizar
   * @param {UpdateMedicineDto} updateMedicineDto - Datos actualizados del medicamento
   * @returns {Promise<Medicine>} El medicamento actualizado
   * 
   * @example
   * PATCH http://localhost:3000/medicine/1
   * Body:
   * ```json
   * {
   *   "stock": 150,
   *   "price": "5500"
   * }
   * ```
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing medicine', description: 'Update an existing medicine in the system hospital management and return the medicine ' })
  @ApiParam({ name: 'id', description: 'ID of the medicine to update', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The medicine has been successfully updated.', type: Medicine })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  /**
   * Elimina un medicamento por su ID
   * 
   * @route DELETE /medicine/:id
   * @param {string} id - ID del medicamento a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/medicine/1
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medicine by its ID', description: 'Delete a medicine by its ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the medicine to delete', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The medicine has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id') id: number) {
    return this.medicineService.remove(+id);
  }

}