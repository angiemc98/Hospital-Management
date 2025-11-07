import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrescriptionDetailService } from './prescription-detail.service';
import { PrescriptionDetail } from './prescription-detail.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';


const mockPrescription = { id: 10, date: new Date() };
const mockMedicine = { id: 20, name: 'Amoxicilina' };


const mockDetail = { 
    id: 1, 
    dose: '10mg', 
    duration: 7, 
    instrucitons: 'Twice daily',
    prescription: mockPrescription,
    medicine: mockMedicine,
};


const mockDetailRepository: any = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(), // Usas 'delete' en remove
};

const mockMedicineRepository: any = {
    findOne: jest.fn(),
};

const mockPrescriptionRepository: any = {
    findOne: jest.fn(),
};

describe('PrescriptionDetailService', () => {
    let service: PrescriptionDetailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrescriptionDetailService,
                // Inyectar los 3 repositorios
                {
                    provide: getRepositoryToken(PrescriptionDetail),
                    useValue: mockDetailRepository,
                },
                {
                    provide: getRepositoryToken(Medicine),
                    useValue: mockMedicineRepository,
                },
                {
                    provide: getRepositoryToken(Prescription),
                    useValue: mockPrescriptionRepository,
                },
            ],
        }).compile();

        service = module.get<PrescriptionDetailService>(PrescriptionDetailService);
        jest.clearAllMocks(); // Limpiar llamadas después de cada test
    });

    // --- CREATE ---
    describe('create', () => {
        const createDto: CreatePrescriptionDetailDto & { prescriptionId: number, medicineId: number } = {
            prescriptionId: 10,
            medicineId: 20,
            dose: '10mg',
            duration: 7,
            instrucitons: 'Twice daily',
        };
        
        const detailToCreate = {
            dose: createDto.dose,
            duration: createDto.duration,
            instrucitons: createDto.instrucitons,
        };

        it('should create a new prescription detail successfully', async () => {
          
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(mockPrescription);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine);
            (mockDetailRepository.create as jest.Mock).mockReturnValue(detailToCreate);
            (mockDetailRepository.save as jest.Mock).mockResolvedValue(mockDetail);

            const result = await service.create(createDto);

            expect(mockPrescriptionRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.prescriptionId } });
            expect(mockMedicineRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.medicineId } });
            expect(mockDetailRepository.create).toHaveBeenCalledWith(detailToCreate);
            expect(result).toEqual({
                message: 'Detalle de prescripción creado exitosamente',
                statusCode: HttpStatus.CREATED,
                data: mockDetail,
            });
        });

        it('should throw NOT_FOUND if Prescription not found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(null);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine);

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
           
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Prescripción no encontrada');
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });

        it('should throw NOT_FOUND if Medicine not found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(mockPrescription);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Medicamento no encontrado');
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });

        it('should throw BAD_REQUEST on unexpected database error', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(mockPrescription);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine);
            (mockDetailRepository.save as jest.Mock).mockRejectedValue(new Error('DB connection failed'));

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.BAD_REQUEST);
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Error al crear el detalle de prescripción');
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        const mockDetailsList = [mockDetail, { ...mockDetail, id: 2 }];

        it('should return all prescription details with relations', async () => {
            (mockDetailRepository.find as jest.Mock).mockResolvedValue(mockDetailsList);

            const result = await service.findAll();

            expect(mockDetailRepository.find).toHaveBeenCalledWith({
                relations: ['prescription', 'medicine'],
            });
            expect(result.data).toEqual(mockDetailsList);
            expect(result.message).toBe('Details de prescription successfully retrieved');
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        const id = 1;

        it('should return the prescription detail if found', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(mockDetail);

            const result = await service.findOne(id);

            expect(mockDetailRepository.findOne).toHaveBeenCalledWith({
                where: { id },
                relations: ['prescription', 'medicine'],
            });
            expect(result.data).toEqual(mockDetail);
        });

        it('should throw NOT_FOUND if detail not found', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.findOne(99)).rejects.toThrow(HttpException);
            await expect(service.findOne(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
            
            
            await expect(service.findOne(99)).rejects.toHaveProperty('response.message', 'Details description not found');
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        const id = 1;
        // DTO incluye los 3 campos modificados
        const updateDto: UpdatePrescriptionDetailsDto = { dose: '20mg', duration: 10, instrucitons: 'After meals' }; 
        
       
        const updatedDetail = { 
            ...mockDetail, 
            ...updateDto,  
        };

        it('should update the prescription detail successfully', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(mockDetail);
            (mockDetailRepository.save as jest.Mock).mockResolvedValue(updatedDetail);

            const result = await service.update(id, updateDto);

            expect(mockDetailRepository.findOne).toHaveBeenCalledWith({ where: { id } });
           
            expect(mockDetailRepository.save).toHaveBeenCalledWith(updatedDetail); 
            expect(result.data.dose).toBe('20mg');
        });

        it('should throw NOT_FOUND if detail not found', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.update(99, updateDto)).rejects.toThrow(HttpException);
            await expect(service.update(99, updateDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        const id = 1;

        it('should delete the prescription detail successfully', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(mockDetail);
            (mockDetailRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

            const result = await service.remove(id);

            expect(mockDetailRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockDetailRepository.delete).toHaveBeenCalledWith(id);
            expect(result.message).toBe('Details description deleted successfully');
        });

        it('should throw NOT_FOUND if detail not found', async () => {
            (mockDetailRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.remove(99)).rejects.toThrow(HttpException);
            await expect(service.remove(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });
})
