import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new medicine
  //http:localhost:3000/medicine
  //The JSON Body must be in the format of the CreateMedicineDto
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

  // ─── GET ───────────────────────────────────────────────
  //Get all medicines
  //http:localhost:3000/medicine
  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get medicine by id
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an medicine
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required for update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an medicine
  //http:localhost:3000/medicine/1
  //The param id is the id of the medicine, is required for delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineService.remove(+id);
  }

}
