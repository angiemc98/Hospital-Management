import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person, Role } from '../person/person.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto'; 

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Valida al usuario por email y contraseña. Usado por el login.
     * @param email Email de la persona
     * @param password Contraseña en texto plano
     */
    async validateUser(email: string, pass: string): Promise<any> {
        // We need to select the password for comparison
        const user = await this.personRepository
            .createQueryBuilder('person')
            .addSelect('person.password') 
            .where('person.email = :email', { email })
            .getOne();

        if (user && (await user.comparePassword(pass))) {
            // Returns the object without the password to avoid exposing it
            const { password, ...result } = user;
            return result; 
        }
        return null;
    }

    /**
     * Proceso de inicio de sesión.
     * @param loginDto DTO con email y contraseña
     */
    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { 
            email: user.email, 
            sub: user.id, 
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
                lastName: user.lastName,
            }
        };
    }
    
    // 💡 Implementation of simple registration
    async register(registerDto: RegisterDto) {
        const { password, ...userData } = registerDto;
        
        const existingUser = await this.personRepository.findOne({ where: [{ email: userData.email }, { document: userData.document }, { phone: userData.phone }] });

        if (existingUser) {
            throw new UnauthorizedException('El email, documento o teléfono ya están registrados.');
        }

        const newUser = this.personRepository.create(registerDto);
        
        newUser.role = registerDto.role || Role.Patient;

        return this.personRepository.save(newUser);
    }
}