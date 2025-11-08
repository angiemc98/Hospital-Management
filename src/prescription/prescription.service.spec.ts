import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './prescription.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { PrescriptionDetail } from 'src/prescription-detail/prescription-detail.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

// --- MOCKS DE ENTIDADES ---
const mockAppointment = { id: 1, date: new Date(), doctorId: 5 };
const mockMedicine = { id: 10, name: 'Paracetamol' };

// --- MOCKS DE REPOSITORIOS (Usamos 'any' para simplificar la interfaz) ---
const mockPrescriptionRepository: any = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
};

const mockAppointmentRepository: any = {
    findOne: jest.fn(),
};

const mockMedicineRepository: any = {
    findOne: jest.fn(),
};

const mockPrescriptionDetailRepository: any = {
    findOne: jest.fn(), 
};


describe('PrescriptionService', () => {
    let service: PrescriptionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrescriptionService,
                {
                    provide: getRepositoryToken(Prescription),
                    useValue: mockPrescriptionRepository,
                },
                {
                    provide: getRepositoryToken(Appointment),
                    useValue: mockAppointmentRepository,
                },
                {
                    provide: getRepositoryToken(PrescriptionDetail), 
                    useValue: mockPrescriptionDetailRepository,
                },
                {
                    provide: getRepositoryToken(Medicine),
                    useValue: mockMedicineRepository,
                },
            ],
        }).compile();

        service = module.get<PrescriptionService>(PrescriptionService);
        jest.clearAllMocks();
    });

    // --- CREATE ---
    describe('create', () => {
        const createDto: CreatePrescriptionDto = {
            appointmentId: 1,
            medicineId: 10,
            date: new Date(),
            observations: 'Tomar cada 8 horas',
            quantity: 30,
            duration: 10,
            details: []
        };

        const prescriptionToSave = {
            date: createDto.date,
            observations: createDto.observations,
            quantity: createDto.quantity,
            duration: createDto.duration,
            appointment: mockAppointment,
            medicine: mockMedicine,
        };

        const savedPrescription = { id: 5, ...prescriptionToSave };

        it('should create a new prescription successfully', async () => {
            // Configurar mocks para las dependencias
            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(mockAppointment);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine);

            // Configurar mocks para la creación
            (mockPrescriptionRepository.create as jest.Mock).mockReturnValue(prescriptionToSave);
            (mockPrescriptionRepository.save as jest.Mock).mockResolvedValue(savedPrescription);

            const result = await service.create(createDto);

            // Verificar llamadas y resultado
            expect(mockAppointmentRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.appointmentId } });
            expect(mockMedicineRepository.findOne).toHaveBeenCalledWith({ where: { id: createDto.medicineId } });
            expect(mockPrescriptionRepository.create).toHaveBeenCalledWith(prescriptionToSave);
            expect(result).toEqual({
                message: 'Prescription created successfully',
                statusCode: HttpStatus.CREATED,
                data: savedPrescription,
            });
        });

        it('should throw NOT_FOUND if Appointment not found', async () => {
            // Simular que el Appointment no existe
            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(null);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine); // Medicine existe

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Appointment not found');
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });

        it('should throw NOT_FOUND if Medicine not found', async () => {
            // Simular que la Medicine no existe
            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(mockAppointment); // Appointment existe
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Medicine not found');
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });

        it('should throw BAD_REQUEST on unexpected error', async () => {
            // Simular un fallo de la base de datos en el save
            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(mockAppointment);
            (mockMedicineRepository.findOne as jest.Mock).mockResolvedValue(mockMedicine);
            (mockPrescriptionRepository.save as jest.Mock).mockRejectedValue(new Error('DB failure'));

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.BAD_REQUEST);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        const foundPrescription = { id: 1, observations: 'test', appointment: mockAppointment, medicine: mockMedicine };
        
        // NOTA: El servicio usa findOne, por lo que mockeamos un único objeto.
        it('should return one prescription with relations successfully', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(foundPrescription);

            const result = await service.findAll();

            expect(mockPrescriptionRepository.findOne).toHaveBeenCalledWith({
                relations: ['appointment', 'medicine'],
            });
            expect(result.data).toEqual(foundPrescription);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        const id = 1;
        const foundPrescription = { id: 1, observations: 'test', appointment: mockAppointment, medicine: mockMedicine };

        it('should return the prescription if found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(foundPrescription);

            const result = await service.findOne(id);

            expect(mockPrescriptionRepository.findOne).toHaveBeenCalledWith({
                where: { id },
                relations: ['appointment', 'medicine'],
            });
            expect(result.data).toEqual(foundPrescription);
            expect(result.message).toBe('Prescripción encontrada');
        });

        it('should throw NOT_FOUND if prescription not found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.findOne(99)).rejects.toThrow(HttpException);
            await expect(service.findOne(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        const id = 1;
        const updateDto: UpdatePrescriptionDto = { observations: 'Nueva observación', quantity: 50, duration: 20, appointmentId: 1, medicineId: 10 };
        const existingPrescription = { id: 1, observations: 'Vieja', quantity: 30 };
        const updatedPrescription = { ...existingPrescription, ...updateDto };

        it('should update the prescription successfully', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(existingPrescription);
            (mockPrescriptionRepository.save as jest.Mock).mockResolvedValue(updatedPrescription);

            const result = await service.update(id, updateDto);

            expect(mockPrescriptionRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockPrescriptionRepository.save).toHaveBeenCalledWith(updatedPrescription);
            expect(result.data.observations).toBe('Nueva observación');
        });

        it('should throw NOT_FOUND if prescription not found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.update(99, updateDto)).rejects.toThrow(HttpException);
            await expect(service.update(99, updateDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        const id = 1;
        const existingPrescription = { id: 1, observations: 'test' };

        it('should delete the prescription successfully', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(existingPrescription);
            (mockPrescriptionRepository.remove as jest.Mock).mockResolvedValue(existingPrescription);

            const result = await service.remove(id);

            expect(mockPrescriptionRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockPrescriptionRepository.remove).toHaveBeenCalledWith(existingPrescription);
            expect(result.message).toBe('Prescripción eliminada correctamente');
        });

        it('should throw NOT_FOUND if prescription not found', async () => {
            (mockPrescriptionRepository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.remove(99)).rejects.toThrow(HttpException);
            await expect(service.remove(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });
});