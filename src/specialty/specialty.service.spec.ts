import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SpecialtyService } from './specialty.service';
import { Specialty } from './specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';

// --- MOCKS DE ENTIDADES ---
const mockSpecialty: Specialty = {
    id_especialidad: 1,
    name: 'Cardiología',
    description: 'Especialidad del corazón',
} as Specialty; 

// --- MOCKS DE REPOSITORIOS ---
const mockSpecialtyRepository = {
    // Métodos usados en el servicio
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

describe('SpecialtyService', () => {
    let service: SpecialtyService;
    let repository: Repository<Specialty>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SpecialtyService,
                {
                    provide: getRepositoryToken(Specialty),
                    useValue: mockSpecialtyRepository,
                },
            ],
        }).compile();

        service = module.get<SpecialtyService>(SpecialtyService);
        // Casting para facilitar el acceso a los mocks
        repository = module.get<Repository<Specialty>>(getRepositoryToken(Specialty)); 
        jest.clearAllMocks();
    });

    // --- CREATE ---
    describe('create', () => {
        const createDto: CreateSpecialtyDto = {
            name: 'Cardiología',
            descripcion: 'Especialidad del corazón',
        };

        it('should create a new specialty successfully', async () => {
            // 1. No existe la especialidad
            (repository.findOne as jest.Mock).mockResolvedValue(null);
            // 2. Crear retorna el DTO
            (repository.create as jest.Mock).mockReturnValue(createDto);
            // 3. Guardar retorna el objeto completo
            (repository.save as jest.Mock).mockResolvedValue(mockSpecialty);

            const result = await service.create(createDto);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { name: createDto.name } });
            expect(repository.create).toHaveBeenCalledWith(createDto);
            expect(repository.save).toHaveBeenCalledWith(createDto);
            expect(result).toEqual({
                message: "Specialty created successfully",
                statusCode: HttpStatus.CREATED,
                data: mockSpecialty,
            });
        });

        it('should return CONFLICT if specialty already exists', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(mockSpecialty);

            const result = await service.create(createDto);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { name: createDto.name } });
            expect(repository.create).not.toHaveBeenCalled();
            expect(result).toEqual({
                message: "Specialty already exists",
                statusCode: HttpStatus.CONFLICT,
                data: mockSpecialty,
            });
        });

        it('should throw BAD_REQUEST on unexpected database error', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(null);
            (repository.create as jest.Mock).mockReturnValue(createDto);
            // Simular un fallo en save
            (repository.save as jest.Mock).mockRejectedValue(new Error('DB connection failed'));

            await expect(service.create(createDto)).rejects.toThrow(HttpException);
            await expect(service.create(createDto)).rejects.toHaveProperty('status', HttpStatus.BAD_REQUEST);
            await expect(service.create(createDto)).rejects.toHaveProperty('response.message', 'Error creating specialty');
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all specialties successfully', async () => {
            const specialtyList = [mockSpecialty, { ...mockSpecialty, id_especialidad: 2, name: 'Pediatría' }];
            (repository.find as jest.Mock).mockResolvedValue(specialtyList);

            const result = await service.findAll();

            expect(repository.find).toHaveBeenCalled();
            expect(result).toEqual({
                message: 'All specialties retrieved successfully',
                statusCode: HttpStatus.OK,
                data: specialtyList,
            });
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        const id = 1;

        it('should return the specialty if found by id_especialidad', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(mockSpecialty);

            const result = await service.findOne(id);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } });
            expect(result.data).toEqual(mockSpecialty);
        });

        it('should throw NOT_FOUND if specialty not found', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.findOne(99)).rejects.toThrow(HttpException);
            // El servicio lanza el HttpException 404, pero el catch lo envuelve en un 400.
            // Para que este test pase, debemos asumir que el servicio está corregido para relanzar el 404.
            // Si no lo está, la aserción correcta sería:
            // await expect(service.findOne(99)).rejects.toHaveProperty('status', HttpStatus.BAD_REQUEST); 
            // Pero testeamos el comportamiento deseado (relanzar 404)
            await expect(service.findOne(99)).rejects.toHaveProperty('response', 'Specialty not found');
            await expect(service.findOne(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND); 
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        const id = 1;
        const updateDto: UpdateSpecialtyDto = { name: 'Cardiología Avanzada', description: 'Nueva descripción' };
        const updatedSpecialty = { ...mockSpecialty, ...updateDto };

        it('should update the specialty successfully', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(mockSpecialty);
            (repository.save as jest.Mock).mockResolvedValue(updatedSpecialty);

            const result = await service.update(id, updateDto);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } });
            // Verifica que save se llama con el objeto combinado (mockSpecialty + updateDto)
            expect(repository.save).toHaveBeenCalledWith(updatedSpecialty); 
            expect(result.data.name).toBe('Cardiología Avanzada');
        });

        it('should throw NOT_FOUND if specialty not found', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.update(99, updateDto)).rejects.toThrow(HttpException);
            // Asumimos el comportamiento deseado de relanzar el 404
            await expect(service.update(99, updateDto)).rejects.toHaveProperty('response', 'Specialty not found');
            await expect(service.update(99, updateDto)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });

    // --- DELETE ---
    describe('delete', () => {
        const id = 1;

        it('should delete the specialty successfully', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(mockSpecialty);
            (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

            const result = await service.delete(id);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id_especialidad: id } });
            expect(repository.delete).toHaveBeenCalledWith(id);
            expect(result.message).toBe('Specialty deleted successfully');
        });

        it('should throw NOT_FOUND if specialty not found', async () => {
            (repository.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.delete(99)).rejects.toThrow(HttpException);
            // Asumimos el comportamiento deseado de relanzar el 404
            await expect(service.delete(99)).rejects.toHaveProperty('response', 'Specialty not found');
            await expect(service.delete(99)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
        });
    });
});