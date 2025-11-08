import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionDetailController } from './prescription-detail.controller';
import {PrescriptionDetailService} from './prescription-detail.service';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';


describe('PrescriptionDetailController', () => {
    // Declare controller and service variables
    let controller: PrescriptionDetailController;
    let service: PrescriptionDetailService; 

    // MockService
    const mockServiceDetail = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrescriptionDetailController],
            providers: [
                {
                    provide: PrescriptionDetailService,
                    useValue: mockServiceDetail,
                },
            ],
        }).compile();

        controller = module.get<PrescriptionDetailController>(PrescriptionDetailController);
        service = module.get<PrescriptionDetailService>(PrescriptionDetailService);
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    // Test: Create a prescription detail
    it('should create a prescription detail', async () => {
        const dto: CreatePrescriptionDetailDto = {
            prescriptionId: 1,
            medicineId: 1,
            dose: '2 pills',
            duration: 5,
            instrucitons: 'After meals',
        };
        mockServiceDetail.create.mockResolvedValue({ id: 1, ...dto });

        const result = await controller.create(dto);
        expect(result).toEqual({ id: 1, ...dto });
        expect(service.create).toHaveBeenCalledWith(dto)
    });

    // Test: Get all prescription details
    it('should get all prescription details', async () => {
        const result = [
            { id: 1, prescriptionId: 1, medicineId: 1, dose: '2 pills', duration: 5, instrucitons: 'After meals' },
            { id: 2, prescriptionId: 1, medicineId: 2, dose: '1 pill', duration: 3, instrucitons: 'Before meals' },
        ];
        mockServiceDetail.findAll.mockResolvedValue(result);
        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalled();
    });

    // Test: Get one prescription detail
    it('should get one prescription detail', async () => {
        const result = { id: 1, prescriptionId: 1, medicineId: 1, dose: '2 pills', duration: 5, instrucitons: 'After meals' };
        mockServiceDetail.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: Update a prescription detail
    it('should update a prescription detail', async () => {
        const dto: UpdatePrescriptionDetailsDto = {
            prescriptionId: 1,
            medicineId: 1,
            dose: '2 pills',
            duration: 5,
            instrucitons: 'After meals',
        };
        mockServiceDetail.update.mockResolvedValue({ id: 1, ...dto });

        const result = await controller.update(1, dto);
        expect(result).toEqual({ id: 1, ...dto });
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: Delete a prescription detail
    it('should delete a prescription detail', async () => {
        const result = { message: 'Prescription detail deleted successfully' };
        mockServiceDetail.remove.mockResolvedValue(result);

        const deleteResult = await controller.remove(1);
        expect(deleteResult).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});   