import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Specialty } from './specialty.entity';

@ApiTags('specialty')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new specialty' })
  @ApiResponse({ status: 201, description: 'The specialty has been successfully created.', type: Specialty })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all specialties' })
  @ApiResponse({ status: 200, description: 'Return all specialties.', type: [Specialty] })
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specialty by id' })
  @ApiResponse({ status: 200, description: 'Return the specialty.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully updated.', type: Specialty })
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialty' })
  @ApiResponse({ status: 200, description: 'The specialty has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Specialty not found.'})
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.delete(id);
  }
}