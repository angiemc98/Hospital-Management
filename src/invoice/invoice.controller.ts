import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Invoice } from './invoice.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../person/person.entity';

/**
 * Controlador para gestionar las operaciones REST de facturas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las facturas del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio InvoiceService.
 * 
 * @route /invoice
 * @export
 * @class InvoiceController
 */
@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  /**
   * Constructor del controlador de facturas
   * 
   * @param {InvoiceService} invoiceService - Servicio que maneja la lógica de negocio de facturas
   */
  constructor(private readonly invoiceService: InvoiceService) {}

  /**
   * Crea una nueva factura
   * 
   * @route POST /invoice
   * @param {CreateInvoiceDto} createInvoiceDto - Datos de la factura a crear
   * @returns {Promise<Invoice>} La factura creada con sus relaciones
   * 
   * @example
   * POST http://localhost:3000/invoice
   * Body:
   * ```json
   * {
   *   "id_cita": 1,
   *   "id_paciente": 5,
   *   "total": 150000.00,
   *   "metodo_pago": "Tarjeta de crédito",
   *   "estado_pago": "Pendiente"
   * }
   * ```
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new invoice', description: 'Create a new invoice in the system hospital management and return the invoice' })
  @ApiResponse({ status: 201, description: 'The invoice has been successfully created.', type: Invoice })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  /**
   * Obtiene todas las facturas
   * 
   * @route GET /invoice
   * @returns {Promise<Invoice[]>} Lista de todas las facturas con sus citas y pacientes asociados
   * 
   * @example
   * GET http://localhost:3000/invoice
   */
  @Get()
  @ApiOperation({ summary: 'Get all invoices', description: 'Get all invoices registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all registered invoices.', type: [Invoice], isArray: true }) 
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  findAll() {
    return this.invoiceService.findAll();
  }

  /**
   * Obtiene una factura por su ID
   * 
   * @route GET /invoice/:id
   * @param {string} id - ID de la factura a buscar
   * @returns {Promise<Invoice>} La factura encontrada con sus relaciones
   * 
   * @example
   * GET http://localhost:3000/invoice/1
   */
  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get an invoice by its ID', description: 'Get an invoice by its ID and return the invoice registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the invoice to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Invoice found.', type: Invoice })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  findOne(@Param('id') id: number) {
    return this.invoiceService.findOne(id);
  }

  /**
   * Actualiza una factura existente
   * 
   * @route PATCH /invoice/:id
   * @param {string} id - ID de la factura a actualizar
   * @param {UpdateInvoiceDto} updateInvoiceDto - Datos actualizados de la factura
   * @returns {Promise<Invoice>} La factura actualizada con sus relaciones
   * 
   * @example
   * PATCH http://localhost:3000/invoice/1
   * Body:
   * ```json
   * {
   *   "total": 200000.00,
   *   "estado_pago": "Pagado",
   *   "metodo_pago": "Efectivo"
   * }
   * ```
   */
  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an existing invoice', description: 'Update an existing invoice in the system hospital management and return the invoice' })
  @ApiParam({ name: 'id', description: 'ID of the invoice to update', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The invoice has been successfully updated.', type: Invoice })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  update(@Param('id') id: number, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  /**
   * Elimina una factura por su ID
   * 
   * @route DELETE /invoice/:id
   * @param {string} id - ID de la factura a eliminar
   * @returns {Promise<{message: string}>} Mensaje de confirmación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/invoice/1
   * // Retorna: { "message": "Invoice with id 1 deleted successfully" }
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete an invoice by its ID', description: 'Delete an invoice by its ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the invoice to delete', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The invoice has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id') id: number) {
    return this.invoiceService.remove(id);
  }
}