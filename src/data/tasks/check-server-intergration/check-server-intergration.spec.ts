import { Test, TestingModule } from '@nestjs/testing';
import { CheckServerIntegrationTask } from './check-server-intergration';

describe('CheckServerIntegrationTask', () => {
  let service: CheckServerIntegrationTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckServerIntegrationTask],
    }).compile();

    service = module.get<CheckServerIntegrationTask>(CheckServerIntegrationTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
