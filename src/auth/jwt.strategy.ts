import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';

// Define the type of the payload that is passed in the JWT token
export interface JwtPayload {
    email: string;
    sub: number;
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
            secretOrKey: jwtConstants.secret, 
        });
    }

    /**
     * Este método se llama después de que el token es validado y decodificado.
     * El payload decodificado se pasa aquí.
     */
    async validate(payload: JwtPayload) {
        // Search for the user in the database
        const user = await this.personRepository.findOne({ 
            where: { id: payload.sub },
            
        });

        if (!user) {
            // If user is not found, throw an error
            return false;
        }

        // Return the user object
        return { 
            id: user.id, 
            email: user.email, 
            role: user.role, 
            name: user.name,
            lastName: user.lastName,
        };
    }
}