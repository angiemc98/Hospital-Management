import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { Office } from 'src/office/office.entity';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

/**
 * Servicio para gestionar las operaciones de citas médicas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Appointment, incluyendo la creación, lectura,
 * actualización y eliminación de citas médicas, así como el manejo
 * de sus relaciones con Doctor, Patient y Office.
 * Implementa manejo robusto de errores con HttpException y respuestas estructuradas.
 * 
 * @export
 * @class AppointmentService
 */
@Injectable()
export class AppointmentService {

  /**
   * Constructor del servicio de citas médicas
   * 
   * @param {Repository<Appointment>} appointmentRepository - Repositorio de TypeORM para la entidad Appointment
   * @param {Repository<Doctor>} doctorRepository - Repositorio de TypeORM para la entidad Doctor
   * @param {Repository<Patient>} patientRepository - Repositorio de TypeORM para la entidad Patient
   * @param {Repository<Office>} officeRepository - Repositorio de TypeORM para la entidad Office
   */
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) { }

  /**
   * Crea una nueva cita médica en la base de datos
   * 
   * @description
   * Crea una cita asociándola con un doctor, paciente y consultorio existentes.
   * Verifica que todas las entidades relacionadas existan antes de crear la cita.
   * Si no se proporciona estado, se establece como 'scheduled' por defecto.
   * Retorna una respuesta estructurada con mensaje, código de estado y datos.
   * 
   * @param {CreateAppointmentDto} createAppointmentDto - Datos de la cita a crear
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} Respuesta con la cita creada
   * @throws {HttpException} Si el doctor, paciente o consultorio no existen
   * @throws {HttpException} Si ocurre un error durante la creación
   * 
   * @example
   * ```typescript
   * const newAppointment = await appointmentService.create({
   *   date: "2024-03-15T10:00:00",
   *   reason: "Consulta general",
   *   notes: "Paciente refiere dolor de cabeza",
   *   status: "scheduled",
   *   doctorId: 1,
   *   patientId: 5,
   *   officeId: 101
   * });
   * // Retorna: { message: "Appointment created successfully", statusCode: 201, data: {...} }
   * ```
   */
  async create (createAppointmentDto: CreateAppointmentDto) {
    try {
      // Búsqueda de paciente, doctor y consultorio por ID
      const doctor = await this.doctorRepository.findOneBy({id: createAppointmentDto.doctorId});
      const patient = await this.patientRepository.findOneBy({id: createAppointmentDto.patientId});
      const office = await this.officeRepository.findOneBy({id_consultorio: createAppointmentDto.officeId});
      
      // Verificación de existencia de doctor, paciente y consultorio
      if (!doctor || !patient) {
        throw new Error('Doctor or patient not found');
      }
      if (!office) {
        throw new Error('Office not found');
      }
      // Crea la cita con las relaciones correctas
      const appointment = this.appointmentRepository.create({
        date: new Date(createAppointmentDto.date),
        reason: createAppointmentDto.reason,
        notes: createAppointmentDto.notes,
        status: createAppointmentDto.status || 'scheduled',
        doctor: doctor,
        patient: patient,
        office: office
      });
      const saved = await this.appointmentRepository.save(appointment);
      return {
        message: 'Appointment created successfully',
        statusCode: HttpStatus.CREATED,
        data: saved
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error creating appointment: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Obtiene todas las citas médicas registradas
   * 
   * @description
   * Recupera todas las citas con sus relaciones de doctor y paciente pobladas.
   * Retorna una respuesta estructurada con mensaje, código de estado y datos.
   * 
   * @returns {Promise<{message: string, statusCode: number, data: Appointment[]}>} Respuesta con todas las citas
   * 
   * @example
   * ```typescript
   * const result = await appointmentService.findAll();
   * // Retorna: { message: "All appointments retrieved successfully", statusCode: 200, data: [...] }
   * ```
   */
  async findAll() {
    const appointments = await this.appointmentRepository.find({ relations: ['doctor', 'patient'] });
    return {
      message: 'All appointments retrieved successfully',
      statusCode: HttpStatus.OK,
      data: appointments,
    }
  }

  /**
   * Busca una cita médica por su ID
   * 
   * @description
   * Recupera una cita específica con sus relaciones de doctor y paciente.
   * Retorna una respuesta estructurada con mensaje, código de estado y datos.
   * 
   * @param {number} id - ID de la cita a buscar
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} Respuesta con la cita encontrada
   * @throws {HttpException} Si la cita no existe (404 NOT_FOUND)
   * 
   * @example
   * ```typescript
   * const result = await appointmentService.findOne(1);
   * // Retorna: { message: "Appointment found successfully", statusCode: 200, data: {...} }
   * ```
   */
  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor', 'patient'] });
    
    if (!appointment) {
      throw new HttpException(
        {
          message: 'Appointment not found',
        },
        HttpStatus.NOT_FOUND
      );
    }
    
    return {
      message: 'Appointment found successfully',
      statusCode: HttpStatus.OK,
      data: appointment,
    }
  }

  /**
   * Actualiza una cita médica existente
   * 
   * @description
   * Actualiza los datos de una cita existente.
   * Verifica la existencia de la cita antes de actualizar.
   * Retorna una respuesta estructurada con mensaje, código de estado y datos actualizados.
   * 
   * @param {number} id - ID de la cita a actualizar
   * @param {UpdateAppointmentDto} updateAppointmentDto - Datos actualizados de la cita
   * @returns {Promise<{message: string, statusCode: number, data: Appointment}>} Respuesta con la cita actualizada
   * @throws {HttpException} Si la cita no existe (404 NOT_FOUND)
   * 
   * @example
   * ```typescript
   * const result = await appointmentService.update(1, {
   *   status: "completed",
   *   notes: "Paciente atendido satisfactoriamente"
   * });
   * // Retorna: { message: "Cita actualizada", statusCode: 200, data: {...} }
   * ```
   */
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException({ message: 'Cita no encontrada' }, HttpStatus.NOT_FOUND);
    }
    Object.assign(appointment, updateAppointmentDto);
    const updated = await this.appointmentRepository.save(appointment);
    return { message: 'Cita actualizada', statusCode: HttpStatus.OK, data: updated };
  }

  /**
   * Elimina una cita médica por su ID
   * 
   * @description
   * Verifica la existencia de la cita antes de eliminarla.
   * Retorna una respuesta estructurada con mensaje de confirmación.
   * 
   * @param {number} id - ID de la cita a eliminar
   * @returns {Promise<{message: string, statusCode: number}>} Mensaje de confirmación de eliminación
   * @throws {HttpException} Si la cita no existe (404 NOT_FOUND)
   * 
   * @example
   * ```typescript
   * const result = await appointmentService.remove(1);
   * // Retorna: { message: "Appointment deleted successfully", statusCode: 200 }
   * ```
   */
  async remove(id: number) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException({ message: 'Cita no encontrada' }, HttpStatus.NOT_FOUND);
    }
    await this.appointmentRepository.delete(id);
    return { message: 'Appointment deleted successfully', statusCode: HttpStatus.OK };
  }
}