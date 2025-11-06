import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a welcome message' })
  @ApiResponse({ status: 200, description: 'Returns "Hello World!"', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}