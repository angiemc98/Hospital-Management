import { Controller, Patch, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new office
  //http:localhost:3000/office
  //The JSON Body must be in the format of the CreateOfficeDto
  @Post()
  create(@Body() dto: CreateOfficeDto) {
    return this.officeService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all offices
  //http:localhost:3000/office
  @Get()
  findAll() {
    return this.officeService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get office by id
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an office
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required for update
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOfficeDto,
  ) {
    return this.officeService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an office
  //http:localhost:3000/office/1
  //The param id is the id of the office, is required for delete
  @Delete(':id')
  remove(@Body('id', ParseIntPipe) id: number) {
    return this.officeService.remove(id);
  }

}
