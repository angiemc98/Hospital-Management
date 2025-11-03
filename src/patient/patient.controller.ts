import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'The patient has been successfully created.', type: Patient })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.createPatient(patientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients.', type: [Patient] })
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id' })
  @ApiResponse({ status: 200, description: 'Return the patient.', type: Patient })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully updated.', type: Patient })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() patientDto: UpdatePatientDto) {
    return this.patientService.update(id, patientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}