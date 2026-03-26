import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getInfo() {
    return { status: 'ok', name: 'web-project-scaffold' };
  }
}
