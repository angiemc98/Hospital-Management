// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Route for user registration. Returns a JSON object with the user data.
     */
    @ApiOperation({ summary: 'Register a new user', description: 'Register a new user in the system' })
    @ApiResponse({ status: 201, description: 'User registered successfully', type: Object })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.authService.register(registerDto);
        return {
            message: 'Registro exitoso. Usuario creado.',
            statusCode: HttpStatus.CREATED,
            user: { id: user.id, email: user.email, role: user.role }
        };
    }

    /**
     * Route for user login. Returns a JSON object with the user data and a JWT token.
     */
    @ApiOperation({ summary: 'Login a user', description: 'Login a user in the system' })
    @ApiResponse({ status: 200, description: 'User logged in successfully', type: Object })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // The service validates the user credentials and returns a JWT token
        return this.authService.login(loginDto);
    }
    
    /**
     * Example of a protected route. Only authenticated users can access this route.
     */
    @ApiOperation({ summary: 'Get user profile', description: 'Get the user profile of the authenticated user' })
    @ApiResponse({ status: 200, description: 'User profile found', type: Object })
    @ApiResponse({ status: 401, description: 'User not authenticated' })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        // req.user contains the object returned by JwtStrategy.validate()
        return {
            message: 'Acceso autorizado',
            user: req.user,
        };
    }
}