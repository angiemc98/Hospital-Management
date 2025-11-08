import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HttpStatus } from '@nestjs/common';

// 1. Mock del AuthService
const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
};

describe('AuthController', () => {
    // declare controller and service
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

     // -----------------------------
  // TESTS LOGIN
  // -----------------------------

    describe('login', () => {
        const loginDto: LoginDto = { email: 'user@test.com', password: 'password123' };
        const resultToken = { 
            access_token: 'mock.token', 
            user: { id: 1, email: 'user@test.com' } 
        };

        it('should call authService.login and return the token and user', async () => {
            mockAuthService.login.mockResolvedValue(resultToken);
            
            const result = await controller.login(loginDto);
            
            expect(service.login).toHaveBeenCalledWith(loginDto);
            expect(result).toEqual(resultToken);
        });
    });

     // -----------------------------
  // TEST REGISTER
  // -----------------------------

    describe('register', () => {
        const registerDto: RegisterDto = { 
            name: 'New', lastName: 'User', document: '123', phone: '123', 
            email: 'new@test.com', password: 'password123',
        };
        const resultUser = { id: 2, email: 'new@test.com', role: 'Patient' };
        const expectedResponse = {
            message: 'Registro exitoso. Usuario creado.',
            statusCode: HttpStatus.CREATED,
            user: resultUser,
        };

        it('should call authService.register and return the success message', async () => {
            mockAuthService.register.mockResolvedValue(resultUser);
            
            const result = await controller.register(registerDto);
            
            expect(service.register).toHaveBeenCalledWith(registerDto);
            expect(result).toEqual(expectedResponse);
        });
    });

    // -----------------------------
  // TESTS PROFILE (protected route)
  // -----------------------------

    describe('getProfile', () => {
        it('should return the user object from the request', async () => {
            const mockRequest = { 
                user: { id: 1, email: 'user@test.com', role: 'admin' } // The user is attached to the JWTGuard
            } as any; 

            const result = controller.getProfile(mockRequest);
            
            expect(result).toEqual({
                message: 'Acceso autorizado',
                user: mockRequest.user,
            });
        });
    });
});