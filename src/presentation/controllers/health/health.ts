import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/health')
export class HealthController {
  @ApiOkResponse({ description: 'Server is Running' })
  @Get()
  get(): string {
    return 'health';
  }
}
