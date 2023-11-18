import { ICheckServerIntegrationTask } from '#/presentation/tasks';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/health')
export class HealthController {
  constructor(
    @Inject('ICheckServerIntegrationTask')
    private readonly checkServerIntegrationTask: ICheckServerIntegrationTask,
  ) {}
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async get(): Promise<void> {
    await this.checkServerIntegrationTask.check();
  }
}
