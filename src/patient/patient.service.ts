import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Person } from '../person/person.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Servicio para gestionar las operaciones de pacientes
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Patient, incluyendo la creación, lectura,
 * actualización y eliminación de pacientes, así como el manejo
 * de sus relaciones con Person.
 * 
 * @export
 * @class PatientService
 */
@Injectable()
export class PatientService {
    /**
     * Constructor del servicio de pacientes
     * 
     * @param {Repository<Patient>} patientRepository - Repositorio de TypeORM para la entidad Patient
     * @param {Repository<Person>} personRepository - Repositorio de TypeORM para la entidad Person
     */
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}

    /**
     * Crea un nuevo paciente en la base de datos
     * 
     * @description
     * Crea un paciente asociándolo con una persona existente.
     * Primero verifica que la persona exista en el sistema antes de crear el paciente.
     * 
     * @param {CreatePatientDto} Patientdto - Datos del paciente a crear
     * @returns {Promise<Patient>} El paciente creado con sus relaciones
     * @throws {Error} Si la persona con el ID proporcionado no existe
     * 
     * @example
     * ```typescript
     * const newPatient = await patientService.createPatient({
     *   personId: 1,
     *   bloodType: "O+",
     *   insurance: "contributive",
     *   medicalHistory: "Hipertensión controlada"
     * });
     * ```
     */
    async create(dto: CreatePatientDto) {
        try {
        const existing = await this.patientRepository.findOne({
            where: { person:{ id: dto.personId } },
            relations: ['person'],
        });
        if (existing) {
            return {
            message: 'Patient already exists',
            statusCode: HttpStatus.CONFLICT,
            data: existing,
            };
        }

        const patient = this.patientRepository.create(dto);
        const saved = await this.patientRepository.save(patient);
        return {
            message: 'Patient created successfully',
            statusCode: HttpStatus.CREATED,
            data: saved,
        };
        } catch (error) {
        throw new HttpException(
            { message: 'Error creating patient', error: error.message },
            HttpStatus.BAD_REQUEST,
        );
        }
    }
    

    /**
     * Obtiene todos los pacientes registrados con sus datos personales
     * 
     * @returns {Promise<Patient[]>} Array con todos los pacientes incluyendo la relación con Person
     * 
     * @example
     * ```typescript
     * const patients = await patientService.findAll();
     * // Retorna pacientes con datos de person poblados
     * ```
     */
    async findAll() {
        try {
        const data = await this.patientRepository.find({ relations: ['person'] });
        return {
            message: 'Patients retrieved successfully',
            statusCode: HttpStatus.OK,
            data,
        };
        } catch (error) {
        throw new HttpException(
            { message: 'Error retrieving patients', error: error.message },
            HttpStatus.BAD_REQUEST,
        );
        }
    }

    /**
     * Busca un paciente por su ID con sus datos personales
     * 
     * @param {number} id - ID del paciente a buscar
     * @returns {Promise<Patient | null>} El paciente encontrado con sus datos personales o null si no existe
     * 
     * @example
     * ```typescript
     * const patient = await patientService.findOne(1);
     * ```
     */
    async findOne(id: number) {
        const patient = await this.patientRepository.findOne({
        where: { id },
        relations: ['person', 'appointments'],
        });
        if (!patient) {
        throw new HttpException(
            { message: 'Patient not found' },
            HttpStatus.NOT_FOUND,
        );
        }
        return {
        message: 'Patient found successfully',
        statusCode: HttpStatus.OK,
        data: patient,
        };
    }

    /**
     * Actualiza un paciente existente
     * 
     * @param {number} id - ID del paciente a actualizar
     * @param {UpdatePatientDto} Patientdto - Datos actualizados del paciente
     * @returns {Promise<Patient>} El paciente actualizado con sus relaciones
     * 
     * @example
     * ```typescript
     * const updated = await patientService.update(1, {
     *   bloodType: "A+",
     *   medicalHistory: "Hipertensión controlada, diabetes tipo 2"
     * });
     * ```
     */
    async update(id: number, dto: UpdatePatientDto) {
        const existing = await this.patientRepository.findOne({ where: { id } });
        if (!existing) {
        throw new HttpException(
            { message: 'Patient not found' },
            HttpStatus.NOT_FOUND,
        );
        }

        Object.assign(existing, dto);
        const updated = await this.patientRepository.save(existing);
        return {
        message: 'Patient updated successfully',
        statusCode: HttpStatus.OK,
        data: updated,
        };
    }

    /**
     * Elimina un paciente por su ID
     * 
     * @param {number} id - ID del paciente a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await patientService.remove(1);
     * ```
     */
    async remove(id: number) {
        const existing = await this.patientRepository.findOne({ where: { id } });
        if (!existing) {
        throw new HttpException(
            { message: 'Patient not found' },
            HttpStatus.NOT_FOUND,
        );
        }
        const deleted = await this.patientRepository.delete(id);
        return {
        message: 'Patient deleted successfully',
        statusCode: HttpStatus.OK,
        data: deleted,
        };
    }

}