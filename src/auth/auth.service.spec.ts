import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person, Role } from '../person/person.entity';
import { UnauthorizedException } from '@nestjs/common';

// 1. Mocks de dependencias

// Mock for TypeORM Query Builder (used in validateUser)
const mockQueryBuilder = {
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
};
// Mock Repository for Person
const mockPersonRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder), 
    findOne: jest.fn(), 
    create: jest.fn(), 
    save: jest.fn(person => ({ ...person, id: person.id || 2 })),
};

const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked.jwt.token'),
};

// 2. Mock of the Person entity
const mockPersonBase: Partial<Person> = {
    id: 1,
    email: 'test@example.com',
    role: Role.Patient, 
    name: 'Test',
    lastName: 'User',
};

// Object that the repository returns for login (includes the password for deconstruction)
const mockPersonFound: Person = { 
    ...mockPersonBase, 
    password: 'hashedPasswordMock', 
    comparePassword: jest.fn(),
} as Person;

 // -----------------------------
  // TESTS AUTH SERVICE
  // -----------------------------

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(Person),
                    useValue: mockPersonRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
        mockQueryBuilder.getOne.mockClear(); 
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // -----------------------------
  // TESTS VALIDATE USERS
  // -----------------------------

    describe('validateUser', () => {
        const passwordCorrecta = 'correctpassword';

        it('should return the user if the password is correct', async () => {
        mockQueryBuilder.getOne.mockResolvedValue(mockPersonFound);
        (mockPersonFound.comparePassword as jest.Mock).mockResolvedValue(true);
        
        const result = await service.validateUser('test@example.com', passwordCorrecta);
        
        // Object expected
        const expectedResult = { 
            id: mockPersonFound.id, 
            email: mockPersonFound.email, 
            role: mockPersonFound.role,
            name: mockPersonFound.name,
            lastName: mockPersonFound.lastName,
            comparePassword: mockPersonFound.comparePassword 
        };
        
        // Verifica el resultado
        expect(result).toEqual(expectedResult);
        expect(mockPersonFound.comparePassword).toHaveBeenCalledWith(passwordCorrecta);
    });
        it('should return null if the password is incorrect', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(mockPersonFound);
            (mockPersonFound.comparePassword as jest.Mock).mockResolvedValue(false);
            
            const result = await service.validateUser('test@example.com', 'wrongpassword');
            
            expect(result).toBeNull();
        });

        it('should return null if the user is not found', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(null);
            
            const result = await service.validateUser('notfound@example.com', 'anypassword');
            
            expect(result).toBeNull();
            // Ya que 'user' es null, comparePassword no debería ser llamada.
            expect(mockPersonFound.comparePassword).not.toHaveBeenCalled(); 
        });
    });

    // -----------------------------
   // TESTS LOGIN
   // -----------------------------

    describe('login', () => {
        const loginDto = { email: 'test@example.com', password: 'password123' };
        
        it('should return the token and user data if the login is successful', async () => {
            // Mockear validateUser with the base object (simulating that validateUser already cleans the password)
            const validateSpy = jest.spyOn(service, 'validateUser')
                .mockResolvedValue(mockPersonBase); 

            const result = await service.login(loginDto);

            expect(validateSpy).toHaveBeenCalledWith(loginDto.email, loginDto.password);
            expect(mockJwtService.sign).toHaveBeenCalledWith({
                email: mockPersonBase.email,
                sub: mockPersonBase.id,
                role: mockPersonBase.role,
            });
            expect(result.access_token).toEqual('mocked.jwt.token');
        });

        it('should throw UnauthorizedException if the credentials are invalid', async () => {
            jest.spyOn(service, 'validateUser').mockResolvedValue(null);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });
    });

     // -----------------------------
  // TESTS REGISTER
  // -----------------------------

    describe('register', () => {
        const registerDto = {
            name: 'New', lastName: 'User', document: '123', phone: '123', 
            email: 'new@user.com', password: 'securepassword',
        };
        
        it('should create a new user with Role.Patient by default', async () => {
            mockPersonRepository.findOne.mockResolvedValue(null);
    
            const createdPersonMock = { ...registerDto, role: Role.Patient, id: 2 };
            mockPersonRepository.create.mockReturnValue(createdPersonMock);
            mockPersonRepository.save.mockResolvedValue(createdPersonMock);

            const result = await service.register(registerDto as any);

            expect(mockPersonRepository.findOne).toHaveBeenCalled();
            expect(mockPersonRepository.create).toHaveBeenCalledWith(registerDto);
            expect(result.role).toEqual(Role.Patient); 
            expect(mockPersonRepository.save).toHaveBeenCalled();
            expect(result.id).toEqual(2);
        });

        it('should throw UnauthorizedException if the email, document or phone already exists', async () => {
            // Simulate that the user exists
            mockPersonRepository.findOne.mockResolvedValue(mockPersonBase);

            await expect(service.register(registerDto as any)).rejects.toThrow(UnauthorizedException);
            expect(mockPersonRepository.save).not.toHaveBeenCalled();
        });
    });
});