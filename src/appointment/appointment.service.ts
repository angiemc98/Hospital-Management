import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { Office } from 'src/office/office.entity';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
    
  ) { }

  // async create (createAppointmentDto: CreateAppointmentDto)
  async create (createAppointmentDto: CreateAppointmentDto) {
    try {
      // Search of patient, doctor and office by ID
      const doctor = await this.doctorRepository.findOneBy({id: createAppointmentDto.doctorId});
      const patient = await this.patientRepository.findOneBy({id: createAppointmentDto.patientId});
      const office = await this.officeRepository.findOneBy({id_consultorio: createAppointmentDto.officeId});
      
      // Verification of existence of doctor, patient and office
      if (!doctor || !patient) {
        throw new Error('Doctor or patient not found');
      }
      if (!office) {
        throw new Error('Office not found');
      }
      // Create the appointment with the correct relations
      const appointment = this.appointmentRepository.create({
        date: new Date(createAppointmentDto.date),
        reason: createAppointmentDto.reason,
        notes: createAppointmentDto.notes,
        status: createAppointmentDto.status || 'scheduled',
        doctor: doctor,
        patient: patient,
        office: office
        
      });
      const saved = await this.appointmentRepository.save(appointment);
      return {
        message: 'Appointment created successfully',
        statusCode: HttpStatus.CREATED,
        data: saved
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error creating appointment: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Find all appointments with relations doctor and patient
  async findAll() {
    const appointments = await this.appointmentRepository.find({ relations: ['doctor', 'patient'] });
    return {
      message: 'All appointments retrieved successfully',
      statusCode: HttpStatus.OK,
      data: appointments,
    }
  }

  // Find one appointment with relations doctor and patient
  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor', 'patient'] });
    
    if (!appointment) {
      throw new HttpException(
        {
          message: 'Appointment not found',
        },
        HttpStatus.NOT_FOUND
      );
    }
    
    return {
      message: 'Appointment found successfully',
      statusCode: HttpStatus.OK,
      data: appointment,
    }
  }

  // Update appoinment use of UpdateAppointmentDto
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException({ message: 'Cita no encontrada' }, HttpStatus.NOT_FOUND);
    }
    Object.assign(appointment, updateAppointmentDto);
    const updated = await this.appointmentRepository.save(appointment);
    return { message: 'Cita actualizada', statusCode: HttpStatus.OK, data: updated };
  }

  // Delete appointment by id
  async remove(id: number) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException({ message: 'Cita no encontrada' }, HttpStatus.NOT_FOUND);
    }
    await this.appointmentRepository.delete(id);
    return { message: 'Appointment deleted successfully', statusCode: HttpStatus.OK };
  }
}
