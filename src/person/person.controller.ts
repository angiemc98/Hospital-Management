import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';


@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new person
  //http:localhost:3000/person
  //The JSON Body must be in the format of the CreatePersonDto
  @Post()
  create(@Body() dto: CreatePersonDto): Promise<Person> {
    return this.personService.create(dto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all persons
  //http:localhost:3000/person
  @Get()
  findAll() {
    return this.personService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get person by id
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  
  // ─── GET ───────────────────────────────────────────────
  //Get person by role
  //http:localhost:3000/person/role/Doctor
  //The param role is the role of the person, is required
  @Get('role/:role')
  findByRole(@Param('role') role: Role) {
    return this.personService.findByrole(role);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an person
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required for update
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePersonDto) {
    return this.personService.update(id, dto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an person
  //http:localhost:3000/person/1
  //The param id is the id of the person, is required for delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}
