import { Test, TestingModule } from '@nestjs/testing';
import { CreateUuidAdapter } from './create-uuid';

describe('CreateUuidAdapter', () => {
  let service: CreateUuidAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUuidAdapter],
    }).compile();

    service = module.get<CreateUuidAdapter>(CreateUuidAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
