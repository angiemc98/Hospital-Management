import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';




describe('SpecialtyController', () => {
    // declare controller and service
    let controller: SpecialtyController;
    let service: SpecialtyService;

    // Mock serviceSpecialty
    const mockSpecialtyService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpecialtyController],
            providers: [
                {
                    provide: SpecialtyService,
                    useValue: mockSpecialtyService,
                },
            ],
        }).compile();

        controller = module.get<SpecialtyController>(SpecialtyController);
        service = module.get<SpecialtyService>(SpecialtyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test: create specialty
    it('should create specialty', async () => {

        const dto: CreateSpecialtyDto = {
            name: 'Cardiologist',
            descripcion: 'Specialty in Cardiology',
        };

        const result = {id: 1, ...dto};
        mockSpecialtyService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all specialties
    it('should find all specialties', async () => {
        const result = [
            {id: 1, name: 'Cardiologist', descripcion: 'Specialty in Cardiology'},
            {id: 2, name: 'Dentist', descripcion: 'Specialty in Dentist'},
        ];
        mockSpecialtyService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one specialty by id
    it('should find one specialty by id', async () => {

        const result = {id: 1, name: 'Cardiologist', descripcion: 'Specialty in Cardiology'};
        mockSpecialtyService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update specialty
    it('should update specialty', async () => {
        const dto: UpdateSpecialtyDto = { name: 'Cardiologist', description: 'Specialty in Cardiology' };
        const result = { id: 1, ...dto };

        mockSpecialtyService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete specialty
    it('should delete specialty', async () => {
        const result = { message: 'Specialty deleted successfully' };
        mockSpecialtyService.delete.mockResolvedValue(result);

        expect(await controller.delete(1)).toEqual(result);
        expect(service.delete).toHaveBeenCalledWith(1);
    });

});