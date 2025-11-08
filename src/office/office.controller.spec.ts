import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';


describe('OfficeController', () => {
    // declare controller and service
    let controller: OfficeController;
    let service: OfficeService;

    // Mock serviceOffice
    const mockOfficeService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
    };

    // function before each test
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OfficeController],
            providers: [
                OfficeService,
                {
                    provide: OfficeService,
                    useValue: mockOfficeService
                }
            ]
        }).compile();

        controller = module.get<OfficeController>(OfficeController);
        service = module.get<OfficeService>(OfficeService);
    });

    // function after each test
    afterEach(async () => {
        jest.clearAllMocks();
    });

    // Test: create office
    it('should create an office', async () => {
        const dto: CreateOfficeDto = {
            num_consultorio: 101,
            piso: 1,
            disponible: true
        };

        const result = {id: 1, ...dto};
        mockOfficeService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(mockOfficeService.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all offices
    it('should get all offices', async () => {
        const result = [
            {
                id: 1,
                num_consultorio: 101,
                piso: 1,
                disponible: true
            },
            {
                id: 2,
                num_consultorio: 202,
                piso: 2,
                disponible: false
            }
        ];

        mockOfficeService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(mockOfficeService.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one office by id
    it('should get one office', async () => {
        const result = {
            id: 1,
            num_consultorio: 101,
            piso: 1,
            disponible: true
        };

        mockOfficeService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update office
    it('should update an office', async () => {
        const dto: UpdateOfficeDto = {
            num_consultorio: 101,
            piso: 1,
            disponible: true
        };

        const result = { ...dto };
        mockOfficeService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete office
    it('should delete an office', async () => {
        const result = { message: 'Office deleted successfully' };
        mockOfficeService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});