import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Medicine } from './medicine.entity';

@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  @ApiResponse({ status: 201, description: 'The medicine has been successfully created.', type: Medicine })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

  @Get()
  @ApiOperation({ summary: 'Get all medicines' })
  @ApiResponse({ status: 200, description: 'Return all medicines.', type: [Medicine] })
  findAll() {
    return this.medicineService.findAll();
  }

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
}