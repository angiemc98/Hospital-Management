import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  
  // ─── POST ───────────────────────────────────────────────
  //Create a new patient
  //http:localhost:3000/patient
  //The JSON Body must be in the format of the CreatePatientDto
  @Post()
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.createPatient(patientDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all patients
  //http:localhost:3000/patient
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get patient by id
  //http:localhost:3000/patient/1
  //The param id is the id of the patient, is required
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an patient
  //http:localhost:3000/patient/1
  //The param id is the id of the patient, is required for update
  @Patch(':id')
  update(@Param('id') id: number, @Body() patientDto: UpdatePatientDto) {
    return this.patientService.update(+id, patientDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  // Delete a patient
  // http:localhost:3000/patient/1
  // The param id is the id of the patient, is required for delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.remove(+id);
  }
}
