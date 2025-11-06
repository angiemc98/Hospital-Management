import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create an auth resource' })
  @ApiResponse({ status: 201, description: 'The resource has been successfully created.', type: String})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all auth resources' })
  @ApiResponse({ status: 200, description: 'Return all resources.', type: String})
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an auth resource by id' })
  @ApiResponse({ status: 200, description: 'Return the resource.', type: String})
  @ApiResponse({ status: 404, description: 'Resource not found.'})
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an auth resource' })
  @ApiResponse({ status: 200, description: 'The resource has been successfully updated.', type: String})
  @ApiResponse({ status: 404, description: 'Resource not found.'})
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an auth resource' })
  @ApiResponse({ status: 200, description: 'The resource has been successfully deleted.', type: String})
  @ApiResponse({ status: 404, description: 'Resource not found.'})
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}