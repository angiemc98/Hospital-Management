import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Person, Role } from './person.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';

describe('PersonService', () => {
    let service: PersonService;
    let repository: Repository<Person>;

    const mockRepository = {
        findOne: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            PersonService,
            {
            provide: getRepositoryToken(Person),
            useValue: mockRepository,
            },
        ],
        }).compile();

        service = module.get<PersonService>(PersonService);
        repository = module.get<Repository<Person>>(getRepositoryToken(Person));
        jest.clearAllMocks();
    });

    // ======================================================
    // CREATE
    // ======================================================
    describe('create', () => {
        const dto = { name: 'John', email: 'john@example.com', role: Role.Doctor } as any;

        it('should create a new person successfully', async () => {
        mockRepository.findOne.mockResolvedValue(null);
        mockRepository.create.mockReturnValue(dto);
        mockRepository.save.mockResolvedValue({ id: 1, ...dto });

        const result = await service.create(dto);

        expect(result).toEqual({
            message: 'Person created successfully',
            statusCode: HttpStatus.CREATED,
            data: { id: 1, ...dto },
        });
        expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should return conflict if person already exists', async () => {
        mockRepository.findOne.mockResolvedValue({ id: 1, ...dto });

        const result = await service.create(dto);

        expect(result.statusCode).toBe(HttpStatus.CONFLICT);
        expect(result.message).toBe('Person already exists');
        expect(mockRepository.save).not.toHaveBeenCalled();
        });

        it('should throw exception on DB error', async () => {
        mockRepository.findOne.mockRejectedValue(new Error('DB error'));
        await expect(service.create(dto)).rejects.toThrow(HttpException);
        });
    });

    // ======================================================
    // FIND ONE BY EMAIL
    // ======================================================
    describe('findOneByEmail', () => {
        it('should return person successfully', async () => {
        const person = { id: 1, email: 'test@mail.com', name: 'Ana', role: Role.Patient };
        mockRepository.findOne.mockResolvedValue(person);

        const result = await service.findOneByEmail('test@mail.com');

        expect(result).toEqual({
            message: 'Person found successfully',
            statusCode: HttpStatus.OK,
            data: person,
        });
        expect(mockRepository.findOne).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should throw exception on error', async () => {
        mockRepository.findOne.mockRejectedValue(new Error('Query failed'));
        await expect(service.findOneByEmail('mail@mail.com')).rejects.toThrow(HttpException);
        });
    });

    // ======================================================
    // FIND ALL
    // ======================================================
    describe('findAll', () => {
        it('should return all persons', async () => {
        const people = [{ id: 1, name: 'Ana' }, { id: 2, name: 'Carlos' }];
        mockRepository.find.mockResolvedValue(people);

        const result = await service.findAll();

        expect(result).toEqual({
            message: 'All persons retrieved successfully',
            statusCode: HttpStatus.OK,
            data: people,
        });
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    // ======================================================
    // FIND BY ROLE
    // ======================================================
    describe('findByrole', () => {
        it('should return persons by role', async () => {
        const persons = [{ id: 1, role: Role.Doctor }];
        mockRepository.find.mockResolvedValue(persons);

        const result = await service.findByrole(Role.Doctor);

        expect(result).toEqual({
            message: 'Persons found successfully',
            statusCode: HttpStatus.OK,
            data: persons,
        });
        });
    });

    // ======================================================
    // UPDATE
    // ======================================================
    describe('update', () => {
        it('should update an existing person', async () => {
        const dto = { phone: '3001234567', name: 'Ana Updated' } as any;
        const existing = { id: 1, name: 'Ana', email: 'ana@mail.com' };
        const updated = { ...existing, ...dto };

        mockRepository.findOne.mockResolvedValue(existing);
        mockRepository.save.mockResolvedValue(updated);

        const result = await service.update(1, dto);

        expect(result).toEqual({
            message: 'Person updated successfully',
            statusCode: HttpStatus.OK,
            data: updated,
        });
        });

        it('should throw if person not found', async () => {
            const dto = new UpdatePersonDto();
            dto.email = 'x@mail.com';

            mockRepository.findOne.mockResolvedValue(null); 

            await expect(service.update(1, dto)).rejects.toThrow(HttpException);
        });
    });

    // ======================================================
    // REMOVE
    // ======================================================
    describe('remove', () => {
        it('should delete person successfully', async () => {
        const deleted = { affected: 1 };
        mockRepository.findOne.mockResolvedValue({ id: 1 });
        mockRepository.delete.mockResolvedValue(deleted);

        const result = await service.remove(1);

        expect(result).toEqual({
            message: 'Person deleted successfully',
            statusCode: HttpStatus.OK,
            data: deleted,
        });
        });

        it('should throw if person not found', async () => {
        mockRepository.findOne.mockResolvedValue(null);
        await expect(service.remove(1)).rejects.toThrow(HttpException);
        });
    });
    });
