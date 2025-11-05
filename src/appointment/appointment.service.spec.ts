import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Patient } from 'src/patient/patient.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Office } from 'src/office/office.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: Repository<Appointment>;
  let patientRepository: Repository<Patient>;
  let doctorRepository: Repository<Doctor>;
  let officeRepository: Repository<Office>;

  const mockAppointmentRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockPatientRepo = { findOneBy: jest.fn() };
  const mockDoctorRepo = { findOneBy: jest.fn() };
  const mockOfficeRepo = { findOneBy: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        { provide: getRepositoryToken(Appointment), useValue: mockAppointmentRepo },
        { provide: getRepositoryToken(Patient), useValue: mockPatientRepo },
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepo },
        { provide: getRepositoryToken(Office), useValue: mockOfficeRepo },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    appointmentRepository = module.get(getRepositoryToken(Appointment));
    jest.clearAllMocks();
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  describe('create', () => {
    it('should create an appointment successfully', async () => {
      const dto = {
        date: new Date(),
        reason: 'Checkup',
        notes: 'Follow up required',
        patientId: 1,
        doctorId: 2,
        officeId: 3,
      };

      mockPatientRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockDoctorRepo.findOneBy.mockResolvedValue({ id: 2 });
      mockOfficeRepo.findOneBy.mockResolvedValue({ id: 3 });
      mockAppointmentRepo.create.mockReturnValue(dto);
      mockAppointmentRepo.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data).toHaveProperty('id');
    });

    it('should throw if patient not found', async () => {
      mockPatientRepo.findOneBy.mockResolvedValue(null);
      const dto = { patientId: 99, doctorId: 1, officeId: 1 };

      await expect(service.create(dto as any)).rejects.toThrow(HttpException);
    });
  });

  // -----------------------------
  // FIND ALL
  // -----------------------------
  describe('findAll', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [{ id: 1 }, { id: 2 }];
      mockAppointmentRepo.find.mockResolvedValue(mockAppointments);

      const result = await service.findAll();

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data.length).toBe(2);
    });
  });

  // -----------------------------
  // FIND ONE
  // -----------------------------
  describe('findOne', () => {
    it('should return one appointment', async () => {
      const mockAppointment = { id: 1, reason: 'Consulta' };
      mockAppointmentRepo.findOne.mockResolvedValue(mockAppointment);

      const result = await service.findOne(1);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data.id).toBe(1);
    });

    it('should throw if appointment not found', async () => {
      mockAppointmentRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(HttpException);
    });
  });

  // -----------------------------
  // UPDATE
  // -----------------------------
  describe('update', () => {
    it('should update appointment successfully', async () => {
      const existing = { id: 1, reason: 'Consulta' };
      const dto = { notes: 'Updated notes', status: 'completed', reason: 'nnnnnn', date: new Date(), patientId: 1, doctorId: 2, officeId: 3 };
      mockAppointmentRepo.findOne.mockResolvedValue(existing);
      mockAppointmentRepo.save.mockResolvedValue({ ...existing, ...dto });

      const result = await service.update(1, dto);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data.notes).toBe('Updated notes');
    });

    it('should throw if appointment not found', async () => {
        const dto = new UpdateAppointmentDto();
        dto.status = 'scheduled';

        mockAppointmentRepo.findOne.mockResolvedValue(null);
        await expect(service.update(999, dto)).rejects.toThrow(HttpException);
    });
  });

  // -----------------------------
  // REMOVE
  // -----------------------------
  describe('remove', () => {
    it('should delete appointment successfully', async () => {
      mockAppointmentRepo.findOne.mockResolvedValue({ id: 1 });
      mockAppointmentRepo.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('Appointment deleted successfully');
    });

    it('should throw if appointment not found', async () => {
      mockAppointmentRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(HttpException);
    });
  });
});
