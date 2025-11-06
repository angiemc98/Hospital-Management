import { Body, Controller, Get, Inject, Patch, Post, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { PrescriptionDetailService } from './prescription-detail.service';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrescriptionDetail } from './prescription-detail.entity';

@ApiTags('prescription-detail')
@Controller('prescription-detail')
export class PrescriptionDetailController {
    constructor(private readonly detailRepository: PrescriptionDetailService){}

    @Post()
    @ApiOperation({ summary: 'Create a new prescription detail' })
    @ApiResponse({ status: 201, description: 'The prescription detail has been successfully created.', type: PrescriptionDetail })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
        return this.detailRepository.create(createPrescriptionDetailDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all prescription details' })
    @ApiResponse({ status: 200, description: 'Return all prescription details.', type: [PrescriptionDetail] })
    findAll() {
        return this.detailRepository.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a prescription detail by id' })
    @ApiResponse({ status: 200, description: 'Return the prescription detail.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.detailRepository.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a prescription detail' })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully updated.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.'})
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePrescriptionDetailsDto: UpdatePrescriptionDetailsDto) {
        return this.detailRepository.update(id, updatePrescriptionDetailsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a prescription detail' })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Prescription detail not found.'})
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.detailRepository.remove(id);
    }
}