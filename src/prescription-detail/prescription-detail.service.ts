import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionDetail } from './prescription-detail.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PrescriptionDetailService {
    constructor(
    @InjectRepository(PrescriptionDetail)
    private readonly detailRepository: Repository<PrescriptionDetail>,
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
) {}

    async create (dto: CreatePrescriptionDetailDto & { prescriptionId?: number, medicineId: number }) {
        try {
            const prescription = await this.prescriptionRepository.findOne({
                where: { id: dto.prescriptionId },
            });
            if (!prescription)
              
                throw new HttpException({ message: 'Prescripción no encontrada' }, HttpStatus.NOT_FOUND);

            const medicine = await this.medicineRepository.findOne({
                where: { id: dto.medicineId },
            });
            if (!medicine)
               
                throw new HttpException({ message: 'Medicamento no encontrado' }, HttpStatus.NOT_FOUND);

            
            const detail = this.detailRepository.create({
                dose: dto.dose,
                duration: dto.duration,
                instrucitons: dto.instrucitons,
            });

            const savedDetail = await this.detailRepository.save(detail);

            return {
                message: 'Detalle de prescripción creado exitosamente',
                statusCode: HttpStatus.CREATED,
                data: savedDetail,
            };
        } catch (error) {
           
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error al crear el detalle de prescripción', error: error.message },
                HttpStatus.BAD_REQUEST,
            ); 
        }
    }

    // Find all prescription details with relations prescription and medicine
    async findAll () {
        try {
            const details = await this.detailRepository.find({
                relations: ['prescription', 'medicine'],
            });
            return {
                message: 'Details de prescription successfully retrieved',
                statusCode: HttpStatus.OK,
                data: details,
            };
        } catch (error) {
            throw new HttpException(
                { message: 'Error retrieving prescription details', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
    }
}

    // Find one prescription detail by id
   async findOne(id: number) {
        try {
            const detail = await this.detailRepository.findOne({
                where: { id },
                relations: ['prescription', 'medicine'],
            });

            if (!detail)
                
                throw new HttpException({ message: 'Details description not found' }, HttpStatus.NOT_FOUND);

            return {
                message: 'Detalle de prescripción encontrado correctamente',
                statusCode: HttpStatus.OK,
                data: detail,
            };
        } catch (error) {
            
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error retrieving prescription details', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // Update prescription detail with correct relations
    async update(id: number, dto: UpdatePrescriptionDetailsDto) {
        try {
            const existing = await this.detailRepository.findOne({ where: { id } });
            if (!existing)
              
                throw new HttpException({ message: 'Details description not found' }, HttpStatus.NOT_FOUND);

            Object.assign(existing, dto);
            const updated = await this.detailRepository.save(existing);

            return {
                message: 'Details description updated successfully',
                statusCode: HttpStatus.OK,
                data: updated,
            };
        } catch (error) {
            
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error updating prescription details', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // Delete prescription detail by id
    async remove(id: number) {
        try {
            const existing = await this.detailRepository.findOne({ where: { id } });
            if (!existing)
              
                throw new HttpException({ message: 'Details description not found' }, HttpStatus.NOT_FOUND);

            const deleted = await this.detailRepository.delete(id);

            return {
                message: 'Details description deleted successfully',
                statusCode: HttpStatus.OK,
                data: deleted,
            };
        } catch (error) { 
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error deleting prescription details', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}