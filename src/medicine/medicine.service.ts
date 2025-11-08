import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { HttpException } from '@nestjs/common';

/**
 * Servicio para gestionar las operaciones de medicamentos
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Medicine, incluyendo la creación, lectura,
 * actualización y eliminación de medicamentos.
 * 
 * @export
 * @class MedicineService
 */
@Injectable()
export class MedicineService {
    /**
     * Constructor del servicio de medicamentos
     * 
     * @param {Repository<Medicine>} medicineRepository - Repositorio de TypeORM para la entidad Medicine
     */
    constructor(
        @InjectRepository(Medicine)
        private readonly medicineRepository: Repository<Medicine>,
    ) {}

    /**
     * Crea un nuevo medicamento en la base de datos
     * 
     * @param {CreateMedicineDto} medicineDto - Datos del medicamento a crear
     * @returns {Promise<Medicine>} El medicamento creado
     * 
     * @example
     * ```typescript
     * const newMedicine = await medicineService.create({
     *   name: "Ibuprofeno",
     *   type: "tablet",
     *   presentation: "400mg",
     *   stock: 50,
     *   price: "3000"
     * });
     * ```
     */
async create(dto: CreateMedicineDto): Promise<{
message: string;
statusCode: number;
data: Medicine;
}> {
try {
    const existing = await this.medicineRepository.findOne({
    where: { name: dto.name },
    });

    if (existing) {
    return {
        message: 'Medicine already exists',
        statusCode: HttpStatus.CONFLICT,
        data: existing,
    };
    }

    const newMedicine = this.medicineRepository.create(dto);
    const saved = await this.medicineRepository.save(newMedicine);

    return {
    message: 'Medicine created successfully',
    statusCode: HttpStatus.CREATED,
    data: saved,
    };
} catch (error) {
    throw new HttpException(
    { message: 'Error creating medicine', error: error.message },
    HttpStatus.BAD_REQUEST,
    );
}
}

    /**
     * Obtiene todos los medicamentos registrados
     * 
     * @returns {Promise<Medicine[]>} Array con todos los medicamentos
     * 
     * @example
     * ```typescript
     * const medicines = await medicineService.findAll();
     * ```
     */
async findAll(): Promise<{
    message: string;
    statusCode: number;
    data: Medicine[];
  }> {
    try {
        const medicines = await this.medicineRepository.find();
        return {
        message: 'All medicines retrieved successfully',
        statusCode: HttpStatus.OK,
        data: medicines,
    };
    } catch (error) {
        throw new HttpException(
        { message: 'Error retrieving medicines', error: error.message },
        HttpStatus.BAD_REQUEST,
    );
    }
}

    /**
     * Busca un medicamento por su ID
     * 
     * @param {number} id - ID del medicamento a buscar
     * @returns {Promise<Medicine | null>} El medicamento encontrado o null si no existe
     * 
     * @example
     * ```typescript
     * const medicine = await medicineService.findOne(1);
     * ```
     */
 async findOne(id: number): Promise<{
    message: string;
    statusCode: number;
    data: Medicine | null;
  }> {
    try {
      const medicine = await this.medicineRepository.findOne({
        where: { id },
      });

      if (!medicine) {
        throw new HttpException(
          { message: 'Medicine not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Medicine found successfully',
        statusCode: HttpStatus.OK,
        data: medicine,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error finding medicine', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    /**
     * Actualiza un medicamento existente
     * 
     * @param {number} id - ID del medicamento a actualizar
     * @param {UpdateMedicineDto} medicineDto - Datos actualizados del medicamento
     * @returns {Promise<Medicine>} El medicamento actualizado
     * 
     * @example
     * ```typescript
     * const updated = await medicineService.update(1, {
     *   stock: 75,
     *   price: "3500"
     * });
     * ```
     */
async update(
    id: number,
    dto: UpdateMedicineDto,
  ): Promise<{
    message: string;
    statusCode: number;
    data: Medicine;
  }> {
    const medicine = await this.medicineRepository.findOne({ where: { id } });
    if (!medicine) {
      throw new HttpException(
        { message: 'Medicine not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(medicine, dto);

    try {
      const updated = await this.medicineRepository.save(medicine);
      return {
        message: 'Medicine updated successfully',
        statusCode: HttpStatus.OK,
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error updating medicine', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    /**
     * Elimina un medicamento por su ID
     * 
     * @param {number} id - ID del medicamento a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await medicineService.remove(1);
     * ```
     */
     async remove(id: number): Promise<{
    message: string;
    statusCode: number;
    data: any;
  }> {
    const medicine = await this.medicineRepository.findOne({ where: { id } });
    if (!medicine) {
      throw new HttpException(
        { message: 'Medicine not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const deleted = await this.medicineRepository.delete(id);
      return {
        message: 'Medicine deleted successfully',
        statusCode: HttpStatus.OK,
        data: deleted,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error deleting medicine', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}