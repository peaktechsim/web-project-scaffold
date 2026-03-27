import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    let database = 'connected';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
    } catch {
      database = 'disconnected';
    }
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database,
    };
  }
}
