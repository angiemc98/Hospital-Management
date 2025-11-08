import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('InvoiceService', () => {
    let service: InvoiceService;

    const mockInvoiceRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const mockAppointmentRepository = {
        findOne: jest.fn(),
    };

    const mockPatientRepository = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            InvoiceService,
            {
            provide: getRepositoryToken(Invoice),
            useValue: mockInvoiceRepository,
            },
            {
            provide: getRepositoryToken(Appointment),
            useValue: mockAppointmentRepository,
            },
            {
            provide: getRepositoryToken(Patient),
            useValue: mockPatientRepository,
            },
        ],
        }).compile();

        service = module.get<InvoiceService>(InvoiceService);
        jest.clearAllMocks();
    });

  // -----------------------------
  // CREATE
  // -----------------------------
    describe('create', () => {

        it('should create a new invoice successfully', async () => {
            const dto = { 
                total: 200, 
                appointmentId: 1, 
                id_cita: 1, 
                id_paciente: 1, 
                metodo_pago: 'Card', 
                estado_pago: 'Pending' 
            };
            
            const appointment = { id: 1, id_cita: 1 };
            const patient = { id: 1, id_paciente: 1 };
            
            const invoiceToSave = { 
                total: 200, 
                metodo_pago: 'Card', 
                estado_pago: 'Pending',
                fecha: expect.any(Date), 
                
                
                propety_cita: appointment,    
                propety_patient: patient,    
            };

            const invoice = { id_factura: 1, ...invoiceToSave };

            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(appointment);
            (mockPatientRepository.findOne as jest.Mock).mockResolvedValue(patient); 
            (mockInvoiceRepository.create as jest.Mock).mockReturnValue(invoiceToSave);
            (mockInvoiceRepository.save as jest.Mock).mockResolvedValue(invoice);

            const result = await service.create(dto); 

            expect(result).toEqual({
                message: 'Invoice created successfully',
                statusCode: HttpStatus.CREATED,
                data: invoice,
            });
            
            expect(mockInvoiceRepository.create).toHaveBeenCalledWith(
                expect.objectContaining(invoiceToSave)
            );
        });

        it('should throw an error if appointment not found', async () => {
        
        (mockPatientRepository.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue(null);
        
        const dto = { total: 100, appointmentId: 99, id_cita: 99, id_paciente: 1, metodo_pago: 'Cash' };

        await expect(service.create(dto)).rejects.toThrow(HttpException);
        await expect(service.create(dto)).rejects.toThrow('Appointment not found');
        });
        
        it('should throw an error if patient not found', async () => {
            (mockAppointmentRepository.findOne as jest.Mock).mockResolvedValue({ id: 1 });
            (mockPatientRepository.findOne as jest.Mock).mockResolvedValue(null); 
            
            const dto = { total: 100, appointmentId: 1, id_cita: 1, id_paciente: 99, metodo_pago: 'Cash' };

            await expect(service.create(dto)).rejects.toThrow(HttpException);
            await expect(service.create(dto)).rejects.toThrow('Patient not found');
        });
    });

    // -----------------------------
  // FIND ALL
  // -----------------------------
    describe('findAll', () => {
        it('should return all invoices', async () => {
        const invoices = [{ id_factura: 1 }, { id_factura: 2 }];
        (mockInvoiceRepository.find as jest.Mock).mockResolvedValue(invoices);

        const result = await service.findAll();

        expect(result).toEqual({
            message: 'All invoices retrieved successfully',
            statusCode: HttpStatus.OK,
            data: invoices,
        });
        });
    });

    // -----------------------------
  // FIND ONE
  // -----------------------------
    describe('findOne', () => {
        it('should return one invoice', async () => {
        const invoice = { id_factura: 1 };
        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(invoice);

        const result = await service.findOne(1);
        expect(result.data).toEqual(invoice);
        });

        it('should throw error if not found', async () => {
        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(null);
        await expect(service.findOne(99)).rejects.toThrow(HttpException);
        });
    });

  // -----------------------------
  // UPDATE
  // -----------------------------
describe('update', () => {
    it('should update an existing invoice', async () => {
        const existing = { id_factura: 1, total: 200, metodo_pago: 'Cash' };
        const updatedData = { total: 250, metodo_pago: 'Transfer', id_factura: 1 };
        const expectedResult = { ...existing, ...updatedData };

        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(existing);
        (mockInvoiceRepository.save as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.update(1, updatedData);

        expect(mockInvoiceRepository.findOne).toHaveBeenCalledWith({ where: { id_factura: 1 } });
        expect(mockInvoiceRepository.save).toHaveBeenCalledWith(expect.objectContaining(expectedResult));
        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.data.total).toBe(250);
    });

    it('should throw if invoice not found', async () => {
        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(null);
        await expect(service.update(99, { total: 150, id_factura: 99, metodo_pago: 'Cash' })).rejects.toThrow(HttpException);
    });
});

  // -----------------------------
  // DELETE (REMOVE)
  // -----------------------------
    describe('remove', () => {
        it('should delete an invoice successfully', async () => {
        const existing = { id_factura: 1 };
        
        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(existing);
        (mockInvoiceRepository.remove as jest.Mock).mockResolvedValue(existing); 

        const result = await service.remove(1);
        
        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(mockInvoiceRepository.remove).toHaveBeenCalledWith(existing); 
        });

        it('should throw if invoice not found', async () => {
        (mockInvoiceRepository.findOne as jest.Mock).mockResolvedValue(null);
        await expect(service.remove(99)).rejects.toThrow(HttpException);
        });
    });
});