import { Inject, Injectable } from '@nestjs/common';

import { ICheckServerIntegrationTask } from '#/presentation/tasks';

@Injectable()
export class CheckServerIntegrationTask implements ICheckServerIntegrationTask {
  constructor(
    @Inject('TypeORMPing')
    private readonly typeORMPing: () => Promise<void>,
  ) {}

  async check(): Promise<void> {
    await this.typeORMPing();
  }
}
