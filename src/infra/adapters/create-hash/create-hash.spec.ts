import { Test, TestingModule } from '@nestjs/testing';
import { CreateHashAdapter } from './create-hash';

describe('CreateHashAdapter', () => {
  let service: CreateHashAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateHashAdapter],
    }).compile();

    service = module.get<CreateHashAdapter>(CreateHashAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
