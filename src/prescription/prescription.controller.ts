import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Prescription } from './prescription.entity';

@ApiTags('prescription')
@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new prescription
  //http:localhost:3000/prescription
  //The JSON Body must be in the format of the CreatePrescriptionDto
  @Post()
  @ApiOperation({ summary: 'Create a new prescription' })
  @ApiResponse({ status: 201, description: 'The prescription has been successfully created.', type: Prescription })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all prescriptions
  //http:localhost:3000/prescription
  @Get()
  @ApiOperation({ summary: 'Get all prescriptions' })
  @ApiResponse({ status: 200, description: 'List of all prescriptions.', type: [Prescription] })
  findAll() {
    return this.prescriptionService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get prescription by id
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required
  @Get(':id')
  @ApiOperation({ summary: 'Get a prescription by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the prescription to search for', type: Number })
  @ApiResponse({ status: 200, description: 'Prescription found.', type: Prescription })
  @ApiResponse({ status: 404, description: 'Prescription not found.' })
  findOne(@Param('id') id: number) {
    return this.prescriptionService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for update
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing prescription' })
  @ApiParam({ name: 'id', description: 'ID of the prescription to update', type: Number })
  @ApiResponse({ status: 200, description: 'The prescription has been successfully updated.', type: Prescription })
  @ApiResponse({ status: 404, description: 'Prescription not found.' })
  update(@Param('id') id: number, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for delete
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prescription by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the prescription to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The prescription has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Prescription not found.' })
  remove(@Param('id') id: number) {
    return this.prescriptionService.remove(+id);
  }
}
