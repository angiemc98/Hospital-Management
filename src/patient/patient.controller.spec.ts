import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';



describe('PatientController', () => {
    // declare controller and service
    let controller: PatientController;
    let service: PatientService;

    // Mock servicePatient
    const mockPatientService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientController],
            providers: [
                {
                    provide: PatientService,
                    useValue: mockPatientService,
                },
            ],
        }).compile();

        controller = module.get<PatientController>(PatientController);
        service = module.get<PatientService>(PatientService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Test: create patient
   it('should create patient', async () => {

        const dto: CreatePatientDto = {
            personId: 1,
            bloodType: 'A+',
            insurance: 'HealthCare Inc.',
            medicalHistory: 'No known allergies',
        };

        const result = {id: 1, ...dto};
        mockPatientService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all patients
    it('should find all patients', async () => {
        const result = [
            {id: 1, personId: 1, bloodType: 'A+', insurance: 'HealthCare Inc.', medicalHistory: 'No known allergies'},
            {id: 2, personId: 2, bloodType: 'B-', insurance: 'HealthCare Inc.', medicalHistory: 'Diabetic'},
        ];
        mockPatientService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one patient by id
    it('should find one patient by id', async () => {

        const result = {id: 1, personId: 1, bloodType: 'A+', insurance: 'HealthCare Inc.', medicalHistory: 'No known allergies'};
        mockPatientService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update patient
    it('should update patient', async () => {
        const dto: UpdatePatientDto = { personid: 1, bloodType: 'A-', insurance: 'HealthCare Inc.', medicalHistory: 'No known allergies' };
        const result = { id: 1, ...dto };

        mockPatientService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete patient
    it('should delete patient', async () => {
        const result = { message: 'Patient deleted successfully' };
        mockPatientService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });

});   
    