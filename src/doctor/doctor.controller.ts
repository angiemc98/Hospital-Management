import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}


  // ─── POST ───────────────────────────────────────────────
  //Create a new doctor
  //http:localhost:3000/doctor
  //The JSON Body must be in the format of the CreateDoctorDto
  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all doctors
  //http:localhost:3000/doctor  
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get doctor by id
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required
  @Get(':id')
  findOne(@Param(('id')) id: number) {
    return this.doctorService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an doctor
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required for update
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an doctor
  //http:localhost:3000/doctor/1
  //The param id is the id of the doctor, is required for delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}
