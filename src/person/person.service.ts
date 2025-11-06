import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person, Role } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

/**
 * Servicio para gestionar las operaciones de personas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Person, incluyendo la creación, lectura,
 * actualización y eliminación de personas, así como búsquedas
 * especializadas por email y rol. Gestiona el hashing automático
 * de contraseñas en operaciones de creación y actualización.
 * 
 * @export
 * @class PersonService
 */
@Injectable()
export class PersonService {
    /**
     * Constructor del servicio de personas
     * 
     * @param {Repository<Person>} personRepository - Repositorio de TypeORM para la entidad Person
     */
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {}

    /**
     * Crea una nueva persona en la base de datos
     * 
     * @description
     * Crea una nueva persona con hashing automático de contraseña.
     * El método save() activa el hook @BeforeInsert que hashea la contraseña
     * antes de guardar el registro.
     * 
     * @param {CreatePersonDto} createPersonDto - Datos de la persona a crear
     * @returns {Promise<Person>} La persona creada con la contraseña hasheada
     * 
     * @example
     * ```typescript
     * const newPerson = await personService.create({
     *   name: "Juan",
     *   lastName: "Pérez",
     *   document: "1234567890",
     *   email: "juan@example.com",
     *   phone: "3001234567",
     *   password: "securePass123",
     *   role: Role.Patient
     * });
     * ```
     */
    async create(createPersonDto: CreatePersonDto): Promise<{
        
        message: string;
        statusCode: number;
        data: Person;
    }>{
        try {
            // person exists
            const existingPerson = await this.personRepository.findOne({ where: { email: createPersonDto.email } });
            if (existingPerson) {
                return {
                    message: 'Person already exists',
                    statusCode: HttpStatus.CONFLICT,
                    data: existingPerson
                };
            }
            const newPerson = this.personRepository.create(createPersonDto);
            // El save permite que se active el @BeforeInsert antes de que un usuario se cree, activando el hashing
            const saved = await this.personRepository.save(newPerson);
            return {
                message: 'Person created successfully',
                statusCode: HttpStatus.CREATED,
                data: saved
            };
            } catch (error) {
                throw new HttpException(
                    {
                        message: 'Error creating person',
                            error: error.message,
                        },
                        HttpStatus.BAD_REQUEST,
                    );
                    }
        }

    /**
     * Busca una persona por su correo electrónico
     * 
     * @description
     * Encuentra una persona utilizando su email como criterio de búsqueda.
     * Permite opcionalmente incluir la contraseña en el resultado,
     * útil para procesos de autenticación.
     * 
     * @param {string} email - Correo electrónico de la persona a buscar
     * @param {boolean} [includePassword=false] - Si es true, incluye la contraseña hasheada en el resultado
     * @returns {Promise<Person | null>} La persona encontrada o null si no existe
     * 
     * @example
     * ```typescript
     * // Búsqueda sin contraseña
     * const person = await personService.findOneByEmail("juan@example.com");
     * 
     * // Búsqueda con contraseña (para login)
     * const personWithPass = await personService.findOneByEmail("juan@example.com", true);
     * ```
     */
    async findOneByEmail(email: string, includePassword = false): Promise<
        { 
            message: string;
            statusCode: number;
            data: Person | null;
        }> {
        
        try {
            const findOptions = {
                where: { email },
                select: includePassword ? ['id', 'name', 'email', 'role', 'password'] : ['id', 'name', 'email', 'role'],
            } as any;
        
        return {
            message: 'Person found successfully',
            statusCode: HttpStatus.OK,
            data: await this.personRepository.findOne(findOptions)
        };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error finding person by email',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    /**
     * Obtiene todas las personas registradas
     * 
     * @returns {Promise<Person[]>} Array con todas las personas
     * 
     * @example
     * ```typescript
     * const allPersons = await personService.findAll();
     * ```
     */
    async findAll(): Promise <{
        message: string;
        statusCode: number;
        data: Person[];
    }> {
        try {
            const allPersons = await this.personRepository.find();
            return {
                message: 'All persons retrieved successfully',
                statusCode: HttpStatus.OK,
                data: allPersons
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error retrieving all persons',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    /**
     * Busca personas por su rol
     * 
     * @description
     * Filtra y retorna todas las personas que tienen un rol específico.
     * Útil para obtener listas de doctores, pacientes o administradores.
     * 
     * @param {Role} role - Rol a filtrar (Doctor, Patient o Admin)
     * @returns {Promise<Person[]>} Array de personas con el rol especificado
     * 
     * @example
     * ```typescript
     * const doctors = await personService.findByrole(Role.Doctor);
     * const patients = await personService.findByrole(Role.Patient);
     * ```
     */
    async findByrole(role: Role): Promise<{
        message: string;
        statusCode: number;
        data: Person[];
        }> {
            try {
                const persons = await this.personRepository.find({ where: { role } });
                return {
                    message: 'Persons found successfully',
                    statusCode: HttpStatus.OK,
                    data: persons
                };
            } catch (error) {
                throw new HttpException(
                    {message: 'Error finding persons by role', error: error.message},
                    HttpStatus.BAD_REQUEST,
                );
                }
        }


    /**
     * Busca una persona por su ID
     * 
     * @param {number} id - ID de la persona a buscar
     * @returns {Promise<Person | null>} La persona encontrada o null si no existe
     * 
     * @example
     * ```typescript
     * const person = await personService.findOne(1);
     * ```
     */
    async findOne(id: number): Promise<{
        message: string;
        statusCode: number;
        data: Person | null;
        }> {
        try {
            const person = await this.personRepository.findOne({ where: { id } });
            return {
                message: 'Person found successfully',
                statusCode: HttpStatus.OK,
                data: person
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error finding person by id',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    /**
     * Actualiza una persona existente
     * 
     * @description
     * Actualiza los datos de una persona. Si se actualiza la contraseña,
     * el hook @BeforeUpdate se encarga de hashearla automáticamente.
     * 
     * @param {number} id - ID de la persona a actualizar
     * @param {UpdatePersonDto} updatePersonDto - Datos actualizados de la persona
     * @returns {Promise<Person>} La persona actualizada
     * 
     * @example
     * ```typescript
     * const updated = await personService.update(1, {
     *   phone: "3009876543",
     *   email: "newemail@example.com"
     * });
     * ```
     */
    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<{
        message: string;
        statusCode: number;
        data: Person;
    }> {
        const person = await this.personRepository.findOne({ where: { id } });
        if (!person) {
            throw new HttpException(
                {
                    message: 'Person not found',
                    error: 'Person not found',
                },
                HttpStatus.BAD_REQUEST,
            );
        } Object.assign(person, updatePersonDto);
        try {
            const updated = await this.personRepository.save(person);
        return {
            message: 'Person updated successfully',
            statusCode: HttpStatus.OK,
            data: updated
        };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error updating person',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        } 
    }
    /**
     * Elimina una persona por su ID
     * 
     * @param {number} id - ID de la persona a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await personService.remove(1);
     * ```
     */
    // Delete person by id
    async remove(id: number): Promise<{
        message: string;
        statusCode: number;
        data: any;
    }> {
        const person = await this.personRepository.findOne({ where: { id } });
        if (!person) {
            throw new HttpException(
                {
                    message: 'Person not found',
                    error: 'Person not found',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            const deleted = await this.personRepository.delete(id);
            return {
                message: 'Person deleted successfully',
                statusCode: HttpStatus.OK,
                data: deleted
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error deleting person',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}