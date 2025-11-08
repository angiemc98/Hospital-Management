import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MedicineService', () => {
  let service: MedicineService;
  let mockRepository: jest.Mocked<Repository<Medicine>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineService,
        {
          provide: getRepositoryToken(Medicine),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MedicineService>(MedicineService);
  });

  afterEach(() => jest.clearAllMocks());

  // --------------------------------------------------------
  // CREATE
  // --------------------------------------------------------
  describe('create', () => {
    it('should create a new medicine successfully', async () => {
      const dto = {
        name: 'Paracetamol',
        type: 'tablet',
        presentation: '500mg',
        stock: 100,
        description: 'Pain reliever',
        price: '20',
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(dto as any);
      mockRepository.save.mockResolvedValue({ id: 1, ...dto } as any);

      const result = await service.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        message: 'Medicine created successfully',
        statusCode: HttpStatus.CREATED,
        data: { id: 1, ...dto },
      });
    });

    it('should return conflict if medicine already exists', async () => {
      const existing = { id: 1, name: 'Paracetamol' } as Medicine;
      mockRepository.findOne.mockResolvedValue(existing);

      const result = await service.create({ name: 'Paracetamol' } as any);

      expect(result).toEqual({
        message: 'Medicine already exists',
        statusCode: HttpStatus.CONFLICT,
        data: existing,
      });
    });

    it('should throw exception on DB error', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('DB error'));

      await expect(service.create({ name: 'Test' } as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  // --------------------------------------------------------
  // FIND ALL
  // --------------------------------------------------------
  describe('findAll', () => {
    it('should return all medicines', async () => {
      const medicines = [
        { id: 1, name: 'Aspirina' },
        { id: 2, name: 'Ibuprofeno' },
      ] as Medicine[];
      mockRepository.find.mockResolvedValue(medicines);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'All medicines retrieved successfully',
        statusCode: HttpStatus.OK,
        data: medicines,
      });
    });
  });

  // --------------------------------------------------------
  // FIND ONE
  // --------------------------------------------------------
  describe('findOne', () => {
    it('should return a medicine', async () => {
      const medicine = { id: 1, name: 'Paracetamol' } as Medicine;
      mockRepository.findOne.mockResolvedValue(medicine);

      const result = await service.findOne(1);

      expect(result).toEqual({
        message: 'Medicine found successfully',
        statusCode: HttpStatus.OK,
        data: medicine,
      });
    });

    it('should throw if medicine not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(HttpException);
    });
  });

  // --------------------------------------------------------
  // UPDATE
  // --------------------------------------------------------
  describe('update', () => {
    it('should update an existing medicine', async () => {
      const medicine = { id: 1, name: 'Ibuprofeno' } as Medicine;
      mockRepository.findOne.mockResolvedValue(medicine);
      mockRepository.save.mockResolvedValue({ ...medicine, stock: 200 });

      const result = await service.update(1, { stock: 200 } as any);

      expect(result).toEqual({
        message: 'Medicine updated successfully',
        statusCode: HttpStatus.OK,
        data: { ...medicine, stock: 200 },
      });
    });

    it('should throw if medicine not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(99, {} as any)).rejects.toThrow(HttpException);
    });
  });

  // --------------------------------------------------------
  // REMOVE
  // --------------------------------------------------------
  describe('remove', () => {
    it('should delete a medicine successfully', async () => {
      const medicine = { id: 1 } as Medicine;
      mockRepository.findOne.mockResolvedValue(medicine);
      mockRepository.delete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(1);

      expect(result).toEqual({
        message: 'Medicine deleted successfully',
        statusCode: HttpStatus.OK,
        data: { affected: 1 },
      });
    });

    it('should throw if medicine not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(HttpException);
    });
  });
});
