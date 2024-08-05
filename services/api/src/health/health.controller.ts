import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '@lib/decorator';

@ApiTags('api/v1')
@Controller('health')
export class HealthController {
  constructor(
    private http: HttpHealthIndicator,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }
}
