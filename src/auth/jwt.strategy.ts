// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';

// Define la interfaz del payload que esperas en el token JWT
export interface JwtPayload {
    email: string;
    sub: number; // ID de la persona
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret, // Usamos la clave secreta
        });
    }

    /**
     * Este método se llama después de que el token es validado y decodificado.
     * El payload decodificado se pasa aquí.
     */
    async validate(payload: JwtPayload) {
        // En este punto, el token es válido. Buscamos la persona por su ID.
        const user = await this.personRepository.findOne({ 
            where: { id: payload.sub },
            // Puedes añadir relaciones aquí si las necesitas en la respuesta
        });

        if (!user) {
            // Esto lanzará un 401 Unauthorized si el usuario no existe.
            return false;
        }

        // Retornamos el objeto 'user' que será inyectado en Request.user
        return { 
            id: user.id, 
            email: user.email, 
            role: user.role, 
            name: user.name,
            lastName: user.lastName,
            // Nota: La contraseña NO se incluye aquí ya que no fue seleccionada.
        };
    }
}