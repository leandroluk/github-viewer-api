import { HealthDTO } from '#/presentation/response-objects/health';
import { ICheckServerIntegrationTask } from '#/presentation/tasks';
import { vars } from '#/vars';
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
  async get(): Promise<HealthDTO> {
    await this.checkServerIntegrationTask.check();
    return vars.app;
  }
}
