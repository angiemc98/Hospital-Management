import { Body, Controller, Get, Inject, Patch, Post, Param, Delete } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { PrescriptionDetailService } from './prescription-detail.service';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PrescriptionDetail } from './prescription-detail.entity';

@ApiTags('prescription-detail')
@Controller('prescription-detail')
export class PrescriptionDetailController {
    constructor(private readonly detailRepository: PrescriptionDetailService){}

    // ─── POST ───────────────────────────────────────────────
    //Create a new prescription detail
    //http:localhost:3000/prescription-detail
    // table relation between prescription and medicine, parameters id of prescription and medicine
    @Post()
    @ApiOperation({ summary: 'Create a new prescription detail' })
    @ApiResponse({ status: 201, description: 'The prescription detail has been successfully created.', type: PrescriptionDetail })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
        return this.detailRepository.create(createPrescriptionDetailDto);
    }

    // ─── GET ───────────────────────────────────────────────
    //Get all prescription details
    //http:localhost:3000/prescription-detail
    @Get()
    @ApiOperation({ summary: 'Get all prescription details' })
    @ApiResponse({ status: 200, description: 'List of all prescription details.', type: [PrescriptionDetail] })
    findAll() {
        return this.detailRepository.findAll();
    }

    // ─── GET ───────────────────────────────────────────────
    //Get prescription detail by id
    //http:localhost:3000/prescription-detail/1
    //The param id is the id of the prescription detail, is required
    @Get(':id')
    @ApiOperation({ summary: 'Get a prescription detail by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to search for', type: Number })
    @ApiResponse({ status: 200, description: 'Prescription detail found.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    findOne(@Param('id') id: number) {
        return this.detailRepository.findOne(id);
    }

    // ─── PATCH ───────────────────────────────────────────────
    // Update prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for update
    @Patch(':id')
     @ApiOperation({ summary: 'Update an existing prescription detail' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to update', type: Number })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully updated.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    update(@Param('id') id: number, @Body() updatePrescriptionDetailsDto: UpdatePrescriptionDetailsDto) {
        return this.detailRepository.update(id, updatePrescriptionDetailsDto);
    }

    // ─── DELETE ───────────────────────────────────────────────
    // Delete prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for delete
    @Delete(':id')
     @ApiOperation({ summary: 'Delete a prescription detail by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to delete', type: Number })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    remove(@Param('id') id: number) {
        return this.detailRepository.remove(id);
    }

}


