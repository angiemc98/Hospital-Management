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
    @ApiOperation({ summary: 'Create a new prescription detail', description: 'Create a new prescription detail in the system hospital management and return the prescription detail' })
    @ApiResponse({ status: 201, description: 'The prescription detail has been successfully created.', type: PrescriptionDetail })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 409, description: 'Prescription detail already exists.' })
    create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
        return this.detailRepository.create(createPrescriptionDetailDto);
    }

    // ─── GET ───────────────────────────────────────────────
    //Get all prescription details
    //http:localhost:3000/prescription-detail
    @Get()
    @ApiOperation({ summary: 'Get all prescription details', description: 'Get all prescription details registered in the system and return a list of them' })
    @ApiResponse({ status: 200, description: 'List of all prescription details.', type: [PrescriptionDetail], isArray: true })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    findAll() {
        return this.detailRepository.findAll();
    }

    // ─── GET ───────────────────────────────────────────────
    //Get prescription detail by id
    //http:localhost:3000/prescription-detail/1
    //The param id is the id of the prescription detail, is required
    @Get(':id')
    @ApiOperation({ summary: 'Get a prescription detail by its ID', description: 'Get a prescription detail by its ID and return the prescription detail registered in the system' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to search for', type: Number, required: true, example: 1, })
    @ApiResponse({ status: 200, description: 'Prescription detail found.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    findOne(@Param('id') id: number) {
        return this.detailRepository.findOne(id);
    }

    // ─── PATCH ───────────────────────────────────────────────
    // Update prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for update
    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing prescription detail', description: 'Update an existing prescription detail in the system hospital management and return the prescription detail' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to update', type: Number, required: true, example: 1, })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully updated.', type: PrescriptionDetail })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    update(@Param('id') id: number, @Body() updatePrescriptionDetailsDto: UpdatePrescriptionDetailsDto) {
        return this.detailRepository.update(id, updatePrescriptionDetailsDto);
    }

    // ─── DELETE ───────────────────────────────────────────────
    // Delete prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for delete
    @Delete(':id')
     @ApiOperation({ summary: 'Delete a prescription detail by its ID', description: 'Delete a prescription detail by its ID and return the message of confirmation' })
    @ApiParam({ name: 'id', description: 'ID of the prescription detail to delete', type: Number, required: true, example: 1, })
    @ApiResponse({ status: 200, description: 'The prescription detail has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Prescription detail not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    remove(@Param('id') id: number) {
        return this.detailRepository.remove(id);
    }

}


