import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './office.entity';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';


/**
 * Servicio para gestionar las operaciones de consultorios
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Office, incluyendo la creación, lectura,
 * actualización y eliminación de consultorios, así como el manejo
 * de sus relaciones con citas.
 * 
 * @export
 * @class OfficeService
 */
@Injectable()
export class OfficeService {

    /**
     * Constructor del servicio de consultorios
     * 
     * @param {Repository<Office>} officeRepository - Repositorio de TypeORM para la entidad Office
     */
    constructor(
        @InjectRepository(Office)
        private readonly officeRepository: Repository<Office>,
    ) {}

    /**
     * Crea un nuevo consultorio en la base de datos
     * 
     * @param {CreateOfficeDto} createOfficeDto - Datos del consultorio a crear
     * @returns {Promise<Office>} El consultorio creado
     * 
     * @example
     * ```typescript
     * const newOffice = await officeService.create({
     *   num_consultorio: 101,
     *   piso: 1,
     *   disponible: true
     * });
     * ```
     */
    async create(createOfficeDto: CreateOfficeDto) {

    const exist = await this.officeRepository.findOne({where: {num_consultorio: createOfficeDto.num_consultorio}});
    if (exist) {
        throw new HttpException('Office already exists', HttpStatus.CONFLICT);
    }
    
    try {
        const office = this.officeRepository.create(createOfficeDto);
        const savedOffice = await this.officeRepository.save(office);

        return {
            message: 'Office created successfully', 
            statusCode: HttpStatus.CREATED, 
            data: savedOffice 
        };
    } catch (error) {
        throw new HttpException('Error creating office', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    /**
     * Obtiene todos los consultorios registrados con sus citas
     * 
     * @returns {Promise<Office[]>} Array con todos los consultorios incluyendo la relación con citas
     * 
     * @example
     * ```typescript
     * const offices = await officeService.findAll();
     * // Retorna consultorios con property_cita poblado
     * ```
     */
    async findAll() {
        const offices = await this.officeRepository.find();
        return {
            message: 'All offices retrieved successfully',
            statusCode: HttpStatus.OK,
            data: offices
        };
    }

    /**
     * Busca un consultorio por su ID incluyendo sus citas
     * 
     * @param {number} id - ID del consultorio a buscar
     * @returns {Promise<Office>} El consultorio encontrado con sus citas
     * @throws {Error} Si el consultorio no existe
     * 
     * @example
     * ```typescript
     * const office = await officeService.findOne(1);
     * ```
     */
    async findOne(id: number) {
        const office = await this.officeRepository.findOne({where: {id_consultorio: id}, relations: ['property_cita']});

        if (!office) throw new HttpException('Office not found', HttpStatus.NOT_FOUND);
        return {
            message: 'Office retrieved successfully',
            statusCode: HttpStatus.OK,
            data: office,
        }
    }

    /**
     * Actualiza un consultorio existente
     * 
     * @param {number} id - ID del consultorio a actualizar
     * @param {UpdateOfficeDto} updateOfficeDto - Datos actualizados del consultorio
     * @returns {Promise<Office>} El consultorio actualizado con sus relaciones
     * @throws {Error} Si el consultorio no existe
     * 
     * @description
     * Verifica la existencia del consultorio antes de actualizar.
     * Si se envía un nuevo num_consultorio, actualiza la relación correspondiente.
     * 
     * @example
     * ```typescript
     * const updated = await officeService.update(1, {
     *   disponible: false,
     *   piso: 2
     * });
     * ```
     */
    async update(id: number, updateOfficeDto: UpdateOfficeDto) {
        
        const office = await this.officeRepository.findOne({where: {id_consultorio: id}});
        if (!office) {
            throw new HttpException('Office not found', HttpStatus.NOT_FOUND);
        }
        
        Object.assign(office, updateOfficeDto);
        const updated = await this.officeRepository.save(office);
        return {
            message: 'Office updated successfully',
            statusCode: HttpStatus.OK,
            data: updated
        }
    }   

    /**
     * Elimina un consultorio por su ID
     * 
     * @param {number} id - ID del consultorio a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await officeService.remove(1);
     * ```
     */
    async remove(id: number) {
        const office = await this.officeRepository.findOne({where: {id_consultorio: id}});
        if (!office) {
            throw new HttpException('Office not found', HttpStatus.NOT_FOUND);
        }
        await this.officeRepository.delete(office);
        return {
            message: 'Office deleted successfully',
            statusCode: HttpStatus.OK,
        }
    }
}