import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

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
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new person', description: 'Create a new person in the system hospital management and return the person' })
  @ApiResponse({ status: 201, description: 'The person has been successfully created.', type: Person })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Person already exists.' })
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
  @ApiOperation({ summary: 'Get all people', description: 'Get all people registered in the system and return a list of them' })
  @ApiResponse({ status: 200, description: 'List of all registered people.', type: [Person], isArray: true }) 
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @ApiOperation({ summary: 'Get a person by their ID', description: 'Get a person by their ID and return the person registered in the system' })
  @ApiParam({ name: 'id', description: 'ID of the person to search for', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'Person found.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @ApiOperation({ summary: 'Get people by their role', description: 'Get all people registered in the system with the specified role and return a list of them' })
  @ApiParam({ name: 'role', description: 'Role to filter by (doctor, paciente, admin)', enum: Role, required: true, example: Role.Doctor })
  @ApiResponse({ status: 200, description: 'List of people with the specified role.', type: [Person] })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
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
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an existing person', description: 'Update an existing person in the system hospital management and return the person' })
  @ApiParam({ name: 'id', description: 'ID of the person to update', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The person has been successfully updated.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a person by their ID', description: 'Delete a person by their ID and return the message of confirmation' })
  @ApiParam({ name: 'id', description: 'ID of the person to delete', type: Number, required: true, example: 1, })
  @ApiResponse({ status: 200, description: 'The person has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}