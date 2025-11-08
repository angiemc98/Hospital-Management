import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Person } from '../person/person.entity';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Importar el guard
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [
        // 1. Importar la entidad Person
        TypeOrmModule.forFeature([Person]), 
        
        // 2. Configurar Passport
        PassportModule,
        
        // 3. Configurar JWT
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' }, // Token válido por 60 minutos
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        JwtStrategy, 
        JwtAuthGuard,
        RolesGuard
    ],
    // Exportar el servicio y la estrategia/guard para que otros módulos los usen
    exports: [AuthService, JwtModule, JwtAuthGuard, RolesGuard], 
})
export class AuthModule {}