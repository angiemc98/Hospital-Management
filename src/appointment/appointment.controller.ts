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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Appointment } from './appointment.entity';

/**
 * @class AppointmentController
 * @description Handles all incoming requests for the appointment resource.
 * @property {AppointmentService} appointmentService - The service that handles the business logic for appointments.
 */
@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  /**
   * @method create
   * @description Creates a new appointment.
   * @param {CreateAppointmentDto} createAppointmentDto - The data to create the appointment with.
   * @returns {Promise<Appointment>} The newly created appointment.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created.',
    type: Appointment,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  /**
   * @method findAll
   * @description Retrieves all appointments.
   * @returns {Promise<Appointment[]>} A list of all appointments.
   */
  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'Return all appointments.',
    type: [Appointment],
  })
  findAll() {
    return this.appointmentService.findAll();
  }

  /**
   * @method findOne
   * @description Retrieves a single appointment by its ID.
   * @param {number} id - The ID of the appointment to retrieve.
   * @returns {Promise<Appointment>} The appointment with the given ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single appointment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the appointment',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the appointment.',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  /**
   * @method update
   * @description Updates an existing appointment.
   * @param {number} id - The ID of the appointment to update.
   * @param {UpdateAppointmentDto} updateAppointmentDto - The data to update the appointment with.
   * @returns {Promise<Appointment>} The updated appointment.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing appointment' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the appointment to update',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully updated.',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  /**
   * @method remove
   * @description Deletes an appointment.
   * @param {number} id - The ID of the appointment to delete.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the appointment to delete',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }
}