import { Test, TestingModule } from '@nestjs/testing';
import { OfficeService } from './office.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Office} from './office.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

describe('OfficeService', () => {
    let service: OfficeService;
    let mockOfficeRepository: Partial<Record<keyof Repository<Office>, jest.Mock>>;

    // Definición de Mocks del Repositorio
    mockOfficeRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OfficeService,
                {
                    provide: getRepositoryToken(Office),
                    useValue: mockOfficeRepository,
                },
            ],
        }).compile();

        service = module.get<OfficeService>(OfficeService);
        jest.clearAllMocks();
    });

  // -----------------------------
  // CREATE
  // -----------------------------

describe('create', () => {
    const createDto = { num_consultorio: 101, piso: 1, disponible: true };

    it('should create a new office successfully', async () => {
        (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(null);
        
        const newOffice = { id_consultorio: 1, ...createDto };
        
        (mockOfficeRepository.create as jest.Mock).mockReturnValue(newOffice);
        (mockOfficeRepository.save as jest.Mock).mockResolvedValue(newOffice);

        const result = await service.create(createDto);

    
        expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({ where: { num_consultorio: 101 } });
        expect(result).toEqual({
            message: 'Office created successfully',
            statusCode: HttpStatus.CREATED,
            data: newOffice,
        });
    });

    it('should throw HttpException if office already exists', async () => {
       
        (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue({ id_consultorio: 1, ...createDto });

        await expect(service.create(createDto)).rejects.toThrow(HttpException);
        await expect(service.create(createDto)).rejects.toThrow('Office already exists');
        await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.CONFLICT); 
    });
});

    // -----------------------------
  // FIND ALL
  // -----------------------------
    describe('findAll', () => {
        it('should return all offices successfully', async () => {
            const offices = [{ id_consultorio: 1, num_consultorio: 101 }, { id_consultorio: 2, num_consultorio: 102 }];
            (mockOfficeRepository.find as jest.Mock).mockResolvedValue(offices);

            const result = await service.findAll();

            expect(mockOfficeRepository.find).toHaveBeenCalled();
            expect(result).toEqual({
                message: 'All offices retrieved successfully',
                statusCode: HttpStatus.OK,
                data: offices,
            });
        });
    });

    // -----------------------------
  // FIND ONE
  // -----------------------------
    describe('findOne', () => {
        const id = 1;
        const office = { id_consultorio: id, num_consultorio: 101, property_cita: [] };

        it('should return one office successfully', async () => {
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(office);

            const result = await service.findOne(id);

            expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({ where: { id_consultorio: id }, relations: ['property_cita'] });
            expect(result.data).toEqual(office);
        });

        it('should throw HttpException if office not found', async () => {
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(null);
            
            await expect(service.findOne(99)).rejects.toThrow(HttpException);
            await expect(service.findOne(99)).rejects.toThrow('Office not found');
        });
    });

    // -----------------------------
  // UPDATE
  // -----------------------------
    describe('update', () => {
        const id = 1;
        const updateDto = { piso: 2, disponible: false, num_consultorio: 101 };
        const existingOffice = { id_consultorio: id, num_consultorio: 101, piso: 1, disponible: true };
        const updatedOffice = { ...existingOffice, ...updateDto };

        it('should update an existing office successfully', async () => {
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(existingOffice);
            (mockOfficeRepository.save as jest.Mock).mockResolvedValue(updatedOffice);

            const result = await service.update(id, updateDto);

            expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({ where: { id_consultorio: id } });
            // Verifica que se llamó a save con el objeto MUTADO (existente + DTO)
            expect(mockOfficeRepository.save).toHaveBeenCalledWith(updatedOffice); 
            expect(result.data.piso).toBe(2);
            expect(result.statusCode).toBe(HttpStatus.OK);
        });

        it('should throw HttpException if office not found', async () => {
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(null);
            
            await expect(service.update(99, updateDto)).rejects.toThrow(HttpException);
            await expect(service.update(99, updateDto)).rejects.toThrow('Office not found');
        });
    });
    
    // -----------------------------
  // REMOVE
  // -----------------------------
    describe('remove', () => {
        const id = 1;
        const office = { id_consultorio: id, num_consultorio: 101 };

        it('should delete an office successfully', async () => {
           
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(office);
           
            (mockOfficeRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 } as DeleteResult);

            const result = await service.remove(id);

            expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({ where: { id_consultorio: id } });
            expect(mockOfficeRepository.delete).toHaveBeenCalledWith(office); 
            expect(result.message).toBe('Office deleted successfully');
            expect(result.statusCode).toBe(HttpStatus.OK);
        });

        it('should throw HttpException if office not found', async () => {
            (mockOfficeRepository.findOne as jest.Mock).mockResolvedValue(null);
            
            await expect(service.remove(99)).rejects.toThrow(HttpException);
            await expect(service.remove(99)).rejects.toThrow('Office not found');
        });
    });
});




