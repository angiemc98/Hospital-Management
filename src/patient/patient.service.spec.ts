import { Test } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';

describe('PatientService', () => {
  let service: PatientService;
  let mockRepository: jest.Mocked<Repository<Patient>>;
  let mockPersonRepository: jest.Mocked<Repository<Person>>;
  
  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    mockPersonRepository = {/* mock */ } as any;
    const module = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Person),
          useValue: mockPersonRepository,
        }
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  describe('create', () => {
    it('should create a new patient successfully', async () => {
      const dto = { bloodType: 'O+', insurance: 'contributive' } as any;
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(dto);
      mockRepository.save.mockResolvedValue({ id: 1, ...dto } as any);

      const result = await service.create(dto);
      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.message).toBe('Patient created successfully');
    });

    it('should return conflict if patient exists', async () => {
      const dto = { bloodType: 'A+' } as any;
      mockRepository.findOne.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result.statusCode).toBe(HttpStatus.CONFLICT);
      expect(result.message).toBe('Patient already exists');
    });
  });

  // -----------------------------
  // FIND ONE
  // -----------------------------

  describe('findOne', () => {
    it('should find a patient', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, bloodType: 'O+' } as any);
      const result = await service.findOne(1);
      expect(result.data.bloodType).toBe('O+');
    });

    it('should throw if not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  // -----------------------------
  // UPDATE
  // -----------------------------
  describe('update', () => {
    it('should update a patient', async () => {
      const patient = { id: 1, bloodType: 'O+' };
      mockRepository.findOne.mockResolvedValue(patient as any);
      mockRepository.save.mockResolvedValue({ ...patient, bloodType: 'A+' } as any);
      const result = await service.update(1, { bloodType: 'A+' } as any);
      expect(result.data.bloodType).toBe('A+');
    });
  });

  // -----------------------------
  // REMOVE
  // -----------------------------
  describe('remove', () => {
    it('should delete a patient', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 } as any);
      mockRepository.delete.mockResolvedValue({ affected: 1 } as any);
      const result = await service.remove(1);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });
});
