import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Medicine } from './medicine.entity';

<<<<<<< HEAD
@ApiTags('medicine')
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
@Controller('medicine')
export class MedicineController {
  /**
   * Constructor del controlador de medicamentos
   * 
   * @param {MedicineService} medicineService - Servicio que maneja la lógica de negocio de medicamentos
   */
  constructor(private readonly medicineService: MedicineService) {}

<<<<<<< HEAD
=======
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
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  @ApiResponse({ status: 201, description: 'The medicine has been successfully created.', type: Medicine })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

<<<<<<< HEAD
=======
  /**
   * Obtiene todos los medicamentos
   * 
   * @route GET /medicine
   * @returns {Promise<Medicine[]>} Lista de todos los medicamentos registrados
   * 
   * @example
   * GET http://localhost:3000/medicine
   */
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
  @Get()
  @ApiOperation({ summary: 'Get all medicines' })
  @ApiResponse({ status: 200, description: 'Return all medicines.', type: [Medicine] })
  findAll() {
    return this.medicineService.findAll();
  }

<<<<<<< HEAD
  @Get(':id')
  @ApiOperation({ summary: 'Get a medicine by id' })
  @ApiResponse({ status: 200, description: 'Return the medicine.', type: Medicine })
  @ApiResponse({ status: 404, description: 'Medicine not found.'})
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a medicine' })
  @ApiResponse({ status: 200, description: 'The medicine has been successfully updated.', type: Medicine })
  @ApiResponse({ status: 404, description: 'Medicine not found.'})
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medicine' })
  @ApiResponse({ status: 200, description: 'The medicine has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Medicine not found.'})
  remove(@Param('id') id: string) {
    return this.medicineService.remove(+id);
  }
=======
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
  remove(@Param('id') id: number) {
    return this.medicineService.remove(+id);
  }

>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
}