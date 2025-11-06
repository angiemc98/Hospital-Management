import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from 'src/medicine/medicine.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Prescription } from './prescription.entity';
import { PrescriptionDetail } from 'src/prescription-detail/prescription-detail.entity';

@Injectable()
export class PrescriptionService {

  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,

    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    
    @InjectRepository(PrescriptionDetail)
    private readonly prescriptionDetailRepository: Repository<Prescription>,
    

    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) { }
  // Create a prescription with the correct relations
  async create(dto: CreatePrescriptionDto) {
    try{// Search for appointment
      const appointment = await this.appointmentRepository.findOne({
        where: { id: dto.appointmentId },
      });
     if (!appointment) {
            throw new HttpException({ message: 'Appointment not found' }, HttpStatus.NOT_FOUND);
        }

      // Search for medicine
      const medicine = await this.medicineRepository.findOne({
        where: { id: dto.medicineId },
      });
      if (!medicine) throw new HttpException({message: 'Medicine not found'}, HttpStatus.NOT_FOUND);

      // Create the prescription with the correct relations
      const prescription = this.prescriptionRepository.create({
        date: dto.date || new Date(),
        observations: dto.observations,
        quantity: dto.quantity || 0,
        duration: dto.duration || 0,
        appointment,
        medicine,
      });

      const savedPrescription = await this.prescriptionRepository.save(prescription);
      return {
        message: 'Prescription created successfully',
        statusCode: HttpStatus.CREATED,
        data: savedPrescription,
      };
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        }
        
        throw new HttpException(
            { message: 'Error creating prescription', error: error.message },
            HttpStatus.BAD_REQUEST, 
        );
      }
  }

  // Find all prescriptions with relations appointment and medicine
  async findAll() {
    const prescripción = await this.prescriptionRepository.findOne({
      relations: ['appointment', 'medicine'],
    });
    return {
      message: 'Prescriptions retrieved successfully',
      statusCode: HttpStatus.OK,
      data: prescripción,
    };
    }

  // Find one prescription with relations appointment and medicine
  async findOne(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['appointment', 'medicine'],
    });
    if (!prescription)
      throw new HttpException('Prescripción no encontrada', HttpStatus.NOT_FOUND);
    return {
      message: 'Prescripción encontrada',
      statusCode: HttpStatus.OK,
      data: prescription,
    };
  }

  // Update prescription with correct relations
  async update(id: number, dto: UpdatePrescriptionDto) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
    });
    if (!prescription)
      throw new HttpException('Prescripción no encontrada', HttpStatus.NOT_FOUND);

    Object.assign(prescription, dto);
    const updated = await this.prescriptionRepository.save(prescription);

    return {
      message: 'Prescripción actualizada correctamente',
      statusCode: HttpStatus.OK,
      data: updated,
    };
  }

  // Delete prescription by id
  async remove(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
    });
    if (!prescription)
      throw new HttpException('Prescripción no encontrada', HttpStatus.NOT_FOUND);

    await this.prescriptionRepository.remove(prescription);
    return {
      message: 'Prescripción eliminada correctamente',
      statusCode: HttpStatus.OK,
    };
  }
}
