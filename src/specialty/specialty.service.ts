import { InjectRepository } from "@nestjs/typeorm";
import { Specialty } from "./specialty.entity";
import { Repository } from "typeorm";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-speciality.dto";
import { HttpException, HttpStatus } from "@nestjs/common";


/**
 * Servicio para gestionar las operaciones de especialidades médicas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Specialty, incluyendo la creación, lectura,
 * actualización y eliminación de especialidades médicas, así como
 * el manejo de sus relaciones con doctores.
 * 
 * @export
 * @class SpecialtyService
 */
export class SpecialtyService {
    /**
     * Constructor del servicio de especialidades
     * 
     * @param {Repository<Specialty>} specialtyRepository - Repositorio de TypeORM para la entidad Specialty
     */
    constructor(
        @InjectRepository(Specialty)
        private readonly specialtyRepository: Repository<Specialty>,
    ) {}

    /**
     * Crea una nueva especialidad en la base de datos
     * 
     * @param {CreateSpecialtyDto} dtospecialty - Datos de la especialidad a crear
     * @returns {Promise<Specialty>} La especialidad creada
     * 
     * @example
     * ```typescript
     * const newSpecialty = await specialtyService.create({
     *   name: "Cardiología",
     *   description: "Especialidad del corazón"
     * });
     * ```
     */
    async create(dtospecialty: CreateSpecialtyDto){
        try {
        const existingSpecialty = await this.specialtyRepository.findOne({
            where: { name: dtospecialty.name }
        });
        if (existingSpecialty) {
            return {
                message: "Specialty already exists",
                statusCode: HttpStatus.CONFLICT,
                data: existingSpecialty
            };
        }
        const newSpecialty = this.specialtyRepository.create(dtospecialty);
        const saved = await this.specialtyRepository.save(newSpecialty);
        return {
            message: "Specialty created successfully",
            statusCode: HttpStatus.CREATED,
            data: saved
        };
        } catch (error) {
            // Este catch maneja errores de TypeORM/DB, no el conflicto
            throw new HttpException(
                {
                    message: "Error creating specialty",
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST
            )
        }    
    
    }

    /**
     * Obtiene todas las especialidades registradas con sus doctores
     * 
     * @returns {Promise<Specialty[]>} Array con todas las especialidades incluyendo la relación con doctores
     * 
     * @example
     * ```typescript
     * const specialties = await specialtyService.findAll();
     * // Retorna especialidades con propety_doctor poblado
     * ```
     */
    async findAll(){
        try {
        const all = await this.specialtyRepository.find();
        return {
            message: 'All specialties retrieved successfully',
            statusCode: HttpStatus.OK,
            data: all,
        };
        } catch (error) {
        // Este catch maneja errores de TypeORM/DB
        throw new HttpException(
            { message: 'Error retrieving specialties', error: error.message },
            HttpStatus.BAD_REQUEST,
        );
        }
    }
    /**
     * Busca una especialidad por su ID
     * 
     * @param {number} id - ID de la especialidad a buscar
     * @returns {Promise<Specialty>} La especialidad encontrada
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * const specialty = await specialtyService.findOne(1);
     * ```
     */
    async findOne(id: number) {

        // Busca la especialidad
        try {
            const specialty = await this.specialtyRepository.findOne({ where: { id_especialidad: id } });
            if (!specialty)
                
                throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);

            return {
                message: 'Specialty found successfully',
                statusCode: HttpStatus.OK,
                data: specialty,
            };
            } catch (error) {
          
            if (error instanceof HttpException) {
                throw error;
            }
          
            throw new HttpException(
                { message: 'Error finding specialty', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
            }
    }
    
    /**
     * Actualiza una especialidad existente
     * 
     * @param {number} id - ID de la especialidad a actualizar
     * @param {UpdateSpecialtyDto} dtospecialty - Datos actualizados de la especialidad
     * @returns {Promise<Specialty>} La especialidad actualizada
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * const updated = await specialtyService.update(1, {
     *   name: "Cardiología Intervencionista",
     *   description: "Especialidad avanzada del corazón"
     * });
     * ```
     */
    async update(id: number, dtospecialty: UpdateSpecialtyDto){
        try {
            const specialty = await this.specialtyRepository.findOne({ where: { id_especialidad: id } });
            if (!specialty)
                throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);

            Object.assign(specialty, dtospecialty);
            const updated = await this.specialtyRepository.save(specialty);

            return {
                message: 'Specialty updated successfully',
                statusCode: HttpStatus.OK,
                data: updated,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
        throw new HttpException(
            { message: 'Error updating specialty', error: error.message },
            HttpStatus.BAD_REQUEST,
        );
        }
    }

    /**
     * Elimina una especialidad por su ID
     * 
     * @param {number} id - ID de la especialidad a eliminar
     * @returns {Promise<void>}
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * await specialtyService.delete(1);
     * ```
     */
    async delete(id: number){
        try {
            const specialty = await this.specialtyRepository.findOne({ where: { id_especialidad: id } });
            if (!specialty)
                throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);

            const deleted = await this.specialtyRepository.delete(id);
            return {
                message: 'Specialty deleted successfully',
                statusCode: HttpStatus.OK,
                data: deleted,
            };
            } catch (error) {
                if (error instanceof HttpException) {
                    throw error;
                }
            throw new HttpException(
                { message: 'Error deleting specialty', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
            }
    }
}