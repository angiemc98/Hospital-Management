import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Person } from 'src/person/person.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common';




describe('DoctorService', () => {
    // Declare service, repository, and mock objects
    let service: DoctorService;
    let doctorRepository: Repository<Doctor>;
    let personRepository: Repository<Person>;
    let specialtyRepository: Repository<Specialty>;

    const mockDoctorRepo = {
        findOne: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        update: jest.fn()
    }
    const mockPersonRepo = {
        findOneBy: jest.fn(),
    }
    const mockSpecialtyRepo = {
        findOneBy: jest.fn(),
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DoctorService,
                {
                    provide: getRepositoryToken(Doctor),
                    useValue: mockDoctorRepo,
                },
                {
                    provide: getRepositoryToken(Person),
                    useValue: mockPersonRepo,
                },
                {
                    provide: getRepositoryToken(Specialty),
                    useValue: mockSpecialtyRepo,
                },
            ]
        }).compile();

        service = module.get<DoctorService>(DoctorService);
        doctorRepository = module.get(getRepositoryToken(Doctor));

        jest.clearAllMocks();
    });
    // -----------------------------
  // TESTS CREATE
  // -----------------------------
    describe('create', () => {
        it('should create a doctor', async () => {
        const doctorData = {
            personaId: 1,
            specialtyId: 2,
            licenseNumber: 'MP-123456'
        };
        // Mocks de entidades que existen
        const mockPerson = { id: 1, name: 'John Doe' };
        const mockSpecialty = { id_especialidad: 2, name: 'Cardiology' }; 

        const savedDoctor = { 
            id: 10, 
            licenseNumber: doctorData.licenseNumber, 
            person: mockPerson, 
            specialty: mockSpecialty 
        };

        mockPersonRepo.findOneBy.mockResolvedValue(mockPerson); 
        mockSpecialtyRepo.findOneBy.mockResolvedValue(mockSpecialty);

        const createdDoctorEntity = { /* ... */ }; 

        mockDoctorRepo.create.mockReturnValue(createdDoctorEntity); 
        mockDoctorRepo.save.mockResolvedValue(savedDoctor); 

        const result = await service.create(doctorData);

        expect(result.statusCode).toBe(201);
        expect(result.data).toHaveProperty('id'); 
        expect(result.message).toBe('Doctor created successfully');
    });
        it('should throw if person not found', async () => {
            mockPersonRepo.findOneBy.mockResolvedValue(null);
            const dto = { licenseNumber: 'DOC-002', personId: 99, specialtyId: 1 };

            await expect(service.create(dto as any)).rejects.toThrow(HttpException);
    });

        it('should throw if specialty not found', async () => {
        mockPersonRepo.findOneBy.mockResolvedValue({ id: 1 });
        mockSpecialtyRepo.findOneBy.mockResolvedValue(null);
        const dto = { licenseNumber: 'DOC-003', personId: 1, specialtyId: 99 };

        await expect(service.create(dto as any)).rejects.toThrow(HttpException);
        });
    });

  // -----------------------------
  // FIND ALL
  // -----------------------------
    describe('findAll', () => {
        it('should return all doctors', async () => {
        const mockDoctors = [{ id: 1 }, { id: 2 }];
        mockDoctorRepo.find.mockResolvedValue(mockDoctors);

        const result = await service.findAll();

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.data.length).toBe(2);
        expect(result.message).toBe('All doctors retrieved successfully');
        });
    });

  // -----------------------------
  // FIND ONE
  // -----------------------------
    describe('findOne', () => {
        it('should return one doctor', async () => {
        const mockDoctor = { id: 1, licenseNumber: 'DOC-2025-01' };
        mockDoctorRepo.findOne.mockResolvedValue(mockDoctor);

        const result = await service.findOne(1);

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.data.id).toBe(1);
        });

        it('should throw if doctor not found', async () => {
        mockDoctorRepo.findOne.mockResolvedValue(null);
        await expect(service.findOne(999)).rejects.toThrow(HttpException);
        });
    });

  // -----------------------------
  // UPDATE
  // -----------------------------
    describe('update', () => {
        it('should update doctor successfully', async () => {
        const existing = { id: 1, licenseNumber: 'DOC-001' };
        const dto = { licenseNumber: 'DOC-NEW' };
        mockDoctorRepo.findOne.mockResolvedValue(existing);
        mockDoctorRepo.save.mockResolvedValue({ ...existing, ...dto });

        const result = await service.update(1, dto);

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.data.licenseNumber).toBe('DOC-NEW');
        });

        it('should throw if doctor not found', async () => {
        mockDoctorRepo.findOne.mockResolvedValue(null);
        await expect(service.update(999, { licenseNumber: 'X' })).rejects.toThrow(HttpException);
        });
    });

  // -----------------------------
  // REMOVE
  // -----------------------------
    describe('remove', () => {
        it('should delete doctor successfully', async () => {
        mockDoctorRepo.findOne.mockResolvedValue({ id: 1 });
        mockDoctorRepo.delete.mockResolvedValue({ affected: 1 });

        const result = await service.remove(1);

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.message).toBe('Doctor deleted successfully');
        });

        it('should throw if doctor not found', async () => {
        mockDoctorRepo.findOne.mockResolvedValue(null);
        await expect(service.remove(999)).rejects.toThrow(HttpException);
        });
    });
    });
