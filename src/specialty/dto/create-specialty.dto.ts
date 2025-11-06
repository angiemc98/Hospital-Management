import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Prescription } from './prescription.entity';

@ApiTags('prescription')
@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  /**
   * Creates a new prescription.
   * @param createPrescriptionDto - The data to create the prescription.
   * @returns The created prescription.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new prescription' })
  @ApiResponse({ status: 201, description: 'The prescription has been successfully created.', type: Prescription })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all prescriptions' })
  @ApiResponse({ status: 200, description: 'Return all prescriptions.', type: [Prescription] })
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a prescription by id' })
  @ApiResponse({ status: 200, description: 'Return the prescription.', type: Prescription })
  @ApiResponse({ status: 404, description: 'Prescription not found.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a prescription' })
  @ApiResponse({ status: 200, description: 'The prescription has been successfully updated.', type: Prescription })
  @ApiResponse({ status: 404, description: 'Prescription not found.'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prescription' })
  @ApiResponse({ status: 200, description: 'The prescription has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Prescription not found.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prescriptionService.remove(id);
  }
}