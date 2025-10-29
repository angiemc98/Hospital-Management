import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new specialty
  //http:localhost:3000/specialty
  //The JSON Body must be in the format of the CreateSpecialtyDto
  @Post()
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all specialties
  //http:localhost:3000/specialty
  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get specialty by id
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required
  @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.specialtyService.findOne(id);
    }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an specialty
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required for update
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an specialty
  //http:localhost:3000/specialty/1
  //The param id is the id of the specialty, is required for delete
  @Delete(':id')
  delete(@Body('id') id: number) {
    return this.specialtyService.delete(+id);
  }
}
