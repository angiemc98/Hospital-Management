// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Route for user registration. Returns a JSON object with the user data.
     */
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
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // The service validates the user credentials and returns a JWT token
        return this.authService.login(loginDto);
    }
    
    /**
     * Example of a protected route. Only authenticated users can access this route.
     */
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