import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

/**
 * Controlador para gestionar las operaciones REST de citas médicas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las citas médicas del sistema. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio AppointmentService.
 * 
 * @route /appointment
 * @export
 * @class AppointmentController
 */
@Controller('appointment')
export class AppointmentController {
  /**
   * Constructor del controlador de citas médicas
   * 
   * @param {AppointmentService} appointmentService - Servicio que maneja la lógica de negocio de citas
   */
  constructor(private readonly appointmentService: AppointmentService) {}

  /**
   * Crea una nueva cita médica
   * 
   * @route POST /appointment
   * @param {CreateAppointmentDto} createAppointmentDto - Datos de la cita a crear
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} La cita creada con respuesta estructurada
   * 
   * @example
   * POST http://localhost:3000/appointment
   * Body:
   * ```json
   * {
   *   "date": "2024-08-15T10:00:00Z",
   *   "reason": "Consulta de control",
   *   "notes": "Paciente reporta mejoría",
   *   "status": "scheduled",
   *   "doctorId": 1,
   *   "patientId": 5,
   *   "officeId": 101
   * }
   * ```
   */
  @ApiOperation({ summary: 'Create a new appointment', description: 'Create a new appointment in the system hospital management and return the appointment' })
  @ApiResponse({ status: 201, description: 'The appointment has been successfully created.', type: Appointment })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Appointment already exists.' })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  /**
   * Obtiene todas las citas médicas
   * 
   * @route GET /appointment
   * @returns {Promise<{message: string, statusCode: number, data: Appointment[]}>} Lista de todas las citas con respuesta estructurada
   * 
   * @example
   * GET http://localhost:3000/appointment
   */
  @ApiOperation({ summary: 'Get all appointments', description: 'Get all appointments registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all registered appointments.', type: [Appointment], isArray: true }) 
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  /**
   * Obtiene una cita médica por su ID
   * 
   * @route GET /appointment/:id
   * @param {number} id - ID de la cita a buscar
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} La cita encontrada con respuesta estructurada
   * 
   * @example
   * GET http://localhost:3000/appointment/1
   */
  @ApiOperation({ summary: 'Get an appointment by their ID', description: 'Get an appointment by their ID and return the appointment registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the appointment to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Appointment found.', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  /**
   * Actualiza una cita médica existente
   * 
   * @route PATCH /appointment/:id
   * @param {number} id - ID de la cita a actualizar
   * @param {UpdateAppointmentDto} updateAppointmentDto - Datos actualizados de la cita
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} La cita actualizada con respuesta estructurada
   * 
   * @example
   * PATCH http://localhost:3000/appointment/1
   * Body:
   * ```json
   * {
   *   "status": "completed",
   *   "notes": "Consulta finalizada. Paciente en buen estado."
   * }
   * ```
   */
  @ApiOperation({ summary: 'Update an existing appointment', description: 'Update an existing appointment in the system hospital management and return the appointment' })
  @ApiParam({ name: 'id', description: 'ID of the appointment to update', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully updated.', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  /**
   * Elimina una cita médica por su ID
   * 
   * @route DELETE /appointment/:id
   * @param {number} id - ID de la cita a eliminar
   * @returns {Promise<{message: string, statusCode: number}>} Mensaje de confirmación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/appointment/1
   * // Retorna: { "message": "Appointment deleted successfully", "statusCode": 200 }
   */
  @ApiOperation({ summary: 'Delete an appointment by their ID', description: 'Delete an appointment by their ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the appointment to delete', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }
}