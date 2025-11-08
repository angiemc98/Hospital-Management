import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Person } from 'src/person/person.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Specialty } from 'src/specialty/specialty.entity';
import { HttpStatus } from '@nestjs/common/enums';

/**
 * Servicio para gestionar las operaciones de doctores
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Doctor, incluyendo la creación, lectura,
 * actualización y eliminación de doctores, así como el manejo
 * de sus relaciones con Person y Specialty.
 * 
 * @export
 * @class DoctorService
 */
@Injectable()
export class DoctorService {
    /**
     * Constructor del servicio de doctores
     * 
     * @param {Repository<Doctor>} doctorRepository - Repositorio de TypeORM para la entidad Doctor
     * @param {Repository<Person>} personRepository - Repositorio de TypeORM para la entidad Person
     * @param {Repository<Specialty>} specialtyRepository - Repositorio de TypeORM para la entidad Specialty
     */
    constructor(
        @InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Specialty) private readonly specialtyRepository: Repository<Specialty>,
    ) {}

    /**
     * Crea un nuevo doctor en la base de datos
     * 
     * @description
     * Crea un doctor asociándolo con una persona y una especialidad existentes.
     * Verifica que tanto la persona como la especialidad existan antes de crear el doctor.
     * 
     * @param {CreateDoctorDto} dto - Datos del doctor a crear
     * @returns {Promise<Doctor>} El doctor creado con sus relaciones
     * @throws {Error} Si la persona con el ID proporcionado no existe
     * @throws {Error} Si la especialidad con el ID proporcionado no existe
     * 
     * @example
     * ```typescript
     * const newDoctor = await doctorService.create({
     *   personaId: 1,
     *   specialtyId: 2,
     *   licenseNumber: "MP-123456"
     * });
     * ```
     */
    async create (dto:CreateDoctorDto): Promise<{
        message: string; 
        statusCode: number;
        data: Doctor
    }> {
        try {
        // Search for person
            const person = await this.personRepository.findOneBy({id: dto.personaId});
            if (!person) {
                throw new HttpException(
                    {message: 'Person not found', statusCode: 400},
                    HttpStatus.NOT_FOUND,
                );
            }
            // Search for specialty
            const specialty = await this.specialtyRepository.findOneBy({id_especialidad: dto.specialtyId});
            if (!specialty) {
                throw new HttpException(
                    {message: 'Specialty not found', statusCode: 400},
                    HttpStatus.NOT_FOUND,
                );
            }
            // Create the doctor
            const doctor = this.doctorRepository.create({person, specialty, licenseNumber: dto.licenseNumber});
            const savedDoctor = await this.doctorRepository.save(doctor);
            return {
                message: 'Doctor created successfully',
                statusCode: 201,
                data: savedDoctor
            };
    } catch (error) {
        throw new HttpException({
            message: 'Error creating doctor',
            statusCode: error.status,
        }, HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Obtiene todos los doctores registrados con sus datos personales
     * 
     * @returns {Promise<Doctor[]>} Array con todos los doctores incluyendo la relación con Person
     * 
     * @example
     * ```typescript
     * const doctors = await doctorService.findAll();
     * // Retorna doctores con datos de person poblados
     * ```
     */
    // Find all doctors with their person data
    async findAll(): Promise<{
        message: string;
        statusCode: number;
        data: Doctor[]
    }> {
        try {
            const doctors = await this.doctorRepository.find({relations: ['person', 'specialty']});
            return {
                message: 'All doctors retrieved successfully',
                statusCode: HttpStatus.OK,
                data: doctors
            };
        } catch (error) {
            throw new HttpException({
                message:'Error retrieving doctors',
                statusCode: error.message
            }, HttpStatus.BAD_REQUEST);
        }        
    }

    /**
     * Busca un doctor por su ID con sus datos personales
     * 
     * @param {number} id - ID del doctor a buscar
     * @returns {Promise<Doctor | null>} El doctor encontrado con sus datos personales o null si no existe
     * 
     * @example
     * ```typescript
     * const doctor = await doctorService.findOne(1);
     * ```
     */
    // Find one doctor with their person data
    async findOne(id: number): Promise<{
        message: string;
        statusCode: number;
        data: Doctor
    }> {
        try {
            const doctor = await this.doctorRepository.findOne({where: {id}, relations: ['person', 'specialty']});
            if (!doctor) {
                throw new HttpException(
                    {message: 'Doctor not found', statusCode: 400},
                    HttpStatus.NOT_FOUND,
                );
            }
            return {
                message: 'Doctor retrieved successfully',
                statusCode: HttpStatus.OK,
                data: doctor
            };
        } catch (error) {
            throw new HttpException({
                message:'Error retrieving doctor',
                statusCode: error.message
            }, HttpStatus.BAD_REQUEST);
        };
    }


    /**
     * Actualiza un doctor existente
     * 
     * @description
     * Actualiza los datos de un doctor incluyendo sus relaciones.
     * Verifica la existencia del doctor y de las entidades relacionadas antes de actualizar.
     * Permite actualizar la persona asociada, la especialidad y el número de licencia.
     * 
     * @param {number} id - ID del doctor a actualizar
     * @param {UpdateDoctorDto} dto - Datos actualizados del doctor
     * @returns {Promise<Doctor>} El doctor actualizado con sus relaciones
     * @throws {Error} Si el doctor no existe
     * @throws {Error} Si la nueva persona especificada no existe
     * @throws {Error} Si la nueva especialidad especificada no existe
     * 
     * @example
     * ```typescript
     * const updated = await doctorService.update(1, {
     *   specialtyId: 3,
     *   licenseNumber: "MP-789012"
     * });
     * ```
     */
    // Update doctor with correct relations
    async update(id: number, dto: UpdateDoctorDto): Promise<{
        message: string;
        statusCode: number;
        data: Doctor
    }> {
        // Verificación de existencia del doctor
        const doctor = await this.doctorRepository.findOne({
            where: { id },
            relations: ['person', 'specialty'],
        });

        // Si el doctor no existe
        if (!doctor) {
            throw new HttpException(
            {message: 'Doctor not found'},
            HttpStatus.NOT_FOUND,
            );
        }
        try {
            if (dto.specialtyId) {
                const specialty = await this.specialtyRepository.findOne({
                    where: { id_especialidad: dto.specialtyId },
                });
                if (!specialty) {
                    throw new HttpException(
                        {message: 'Specialty not found'},
                        HttpStatus.NOT_FOUND,
                    );
                }
                doctor.specialty = specialty;
            }
        // Si se envía nuevo personaId, actualiza la relación
            if (dto.personaId) {
                const person = await this.personRepository.findOne({ where: { id: dto.personaId } });
                if (!person) {
                    throw new HttpException(
                        {message: 'Person not found'},
                        HttpStatus.NOT_FOUND,
                    );
                }
                doctor.person = person;
            }
                Object.assign(doctor, dto);
                const updatedDoctor = await this.doctorRepository.save(doctor);
                return {
                    message: 'Doctor updated successfully',
                    statusCode: HttpStatus.OK,
                    data: updatedDoctor
                };
        } catch (error) {
            throw new HttpException({
                message: 'Error updating doctor',
                statusCode: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Elimina un doctor por su ID
     * 
     * @param {number} id - ID del doctor a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await doctorService.remove(1);
     * ```
     */

    // Delete doctor by id
   async remove(id: number): Promise <{
        message: string;
        statusCode: number;
        data: any;
   }> {
            const doctor = await this.doctorRepository.findOne({where: {id}});

            if (!doctor) {
                throw new HttpException(
                    {message: 'Doctor not found'},
                    HttpStatus.NOT_FOUND,
                );
            }

            try {
                const deleted = await this.doctorRepository.delete(id);
                return {
                    message: 'Doctor deleted successfully',
                    statusCode: HttpStatus.OK,
                    data: deleted
                };
        } catch (error) {
            throw new HttpException({
                message: 'Error deleting doctor',
                statusCode: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }
}