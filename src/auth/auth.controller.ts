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
     * Ruta para el registro de nuevos usuarios (se asumen como pacientes por defecto).
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
     * Ruta para el inicio de sesión. Devuelve un JWT.
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // El servicio maneja la validación de credenciales y la generación del token
        return this.authService.login(loginDto);
    }
    
    /**
     * Ejemplo de ruta protegida (Requiere JWT)
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        // req.user contiene el objeto retornado por JwtStrategy.validate()
        return {
            message: 'Acceso autorizado',
            user: req.user,
        };
    }
}