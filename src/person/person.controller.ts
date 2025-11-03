import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiResponse({ status: 201, description: 'The person has been successfully created.', type: Person })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() dto: CreatePersonDto): Promise<Person> {
    return this.personService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all persons' })
  @ApiResponse({ status: 200, description: 'Return all persons.', type: [Person] })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get person by id' })
  @ApiResponse({ status: 200, description: 'Return the person.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personService.findOne(id);
  }
  
  @Get('role/:role')
  @ApiOperation({ summary: 'Get person by role' })
  @ApiResponse({ status: 200, description: 'Return persons by role.', type: [Person] })
  @ApiParam({ name: 'role', enum: Role })
  findByRole(@Param('role') role: Role) {
    return this.personService.findByrole(role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a person' })
  @ApiResponse({ status: 200, description: 'The person has been successfully updated.', type: Person })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePersonDto) {
    return this.personService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person' })
  @ApiResponse({ status: 200, description: 'The person has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personService.remove(id);
  }
}