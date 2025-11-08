import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

/**
 * Controlador para gestionar las operaciones REST de personas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las personas del sistema. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio PersonService. Incluye endpoints para búsqueda por rol.
 * 
 * @route /person
 * @export
 * @class PersonController
 */
@ApiTags('person')
@Controller('person')
export class PersonController {
  /**
   * Constructor del controlador de personas
   * 
   * @param {PersonService} personService - Servicio que maneja la lógica de negocio de personas
   */
  constructor(private readonly personService: PersonService) {}

  /**
   * Crea una nueva persona
   * 
   * @route POST /person
   * @param {CreatePersonDto} dto - Datos de la persona a crear
   * @returns {Promise<Person>} La persona creada con la contraseña hasheada
   * 
   * @example
   * POST http://localhost:3000/person
   * Body:
   * ```json
   * {
   *   "name": "Juan",
   *   "lastName": "Pérez",
   *   "document": "1234567890",
   *   "email": "juan@example.com",
   *   "phone": "3001234567",
   *   "password": "securePass123",
   *   "role": "paciente",
   *   "birthDate": "1990-05-15"
   * }
   * ```
   */
  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiResponse({ status: 201, description: 'The person has been successfully created.', type: Person })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() dto: CreatePersonDto): Promise<{
    message: string,
    statusCode: number,
    data: Person
  }> {
    return this.personService.create(dto);
  }

  /**
   * Obtiene todas las personas
   * 
   * @route GET /person
   * @returns {Promise<Person[]>} Lista de todas las personas registradas
   * 
   * @example
   * GET http://localhost:3000/person
   */
  @Get()
  @ApiOperation({ summary: 'Get all people' })
  @ApiResponse({ status: 200, description: 'List of all registered people.', type: [Person] })
  findAll() {
    return this.personService.findAll();
  }

  /**
   * Obtiene una persona por su ID
   * 
   * @route GET /person/:id
   * @param {number} id - ID de la persona a buscar
   * @returns {Promise<Person>} La persona encontrada
   * 
   * @example
   * GET http://localhost:3000/person/1
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a person by their ID' })
  @ApiParam({ name: 'id', description: 'ID of the person to search for', type: Number })
  @ApiResponse({ status: 200, description: 'Person found.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  /**
   * Obtiene personas por su rol
   * 
   * @route GET /person/role/:role
   * @param {Role} role - Rol a filtrar (doctor, paciente, admin)
   * @returns {Promise<Person[]>} Lista de personas con el rol especificado
   * 
   * @example
   * GET http://localhost:3000/person/role/doctor
   * GET http://localhost:3000/person/role/paciente
   * GET http://localhost:3000/person/role/admin
   */
  @Get('role/:role')
  @ApiOperation({ summary: 'Get people by their role' })
  @ApiParam({ name: 'role', description: 'Role to filter by (doctor, paciente, admin)', enum: Role })
  @ApiResponse({ status: 200, description: 'List of people with the specified role.', type: [Person] })
  findByRole(@Param('role') role: Role) {
    return this.personService.findByrole(role);
  }

  /**
   * Actualiza una persona existente
   * 
   * @route PATCH /person/:id
   * @param {number} id - ID de la persona a actualizar
   * @param {UpdatePersonDto} dto - Datos actualizados de la persona
   * @returns {Promise<Person>} La persona actualizada
   * 
   * @example
   * PATCH http://localhost:3000/person/1
   * Body:
   * ```json
   * {
   *   "phone": "3009876543",
   *   "email": "newemail@example.com"
   * }
   * ```
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing person' })
  @ApiParam({ name: 'id', description: 'ID of the person to update', type: Number })
  @ApiResponse({ status: 200, description: 'The person has been successfully updated.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  update(@Param('id') id: number, @Body() dto: UpdatePersonDto) {
    return this.personService.update(id, dto);
  }

  /**
   * Elimina una persona por su ID
   * 
   * @route DELETE /person/:id
   * @param {number} id - ID de la persona a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/person/1
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person by their ID' })
  @ApiParam({ name: 'id', description: 'ID of the person to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The person has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}