import { Test, TestingModule } from '@nestjs/testing';
import { CompareHashAdapter } from './compare-hash';

describe('CompareHashAdapter', () => {
  let service: CompareHashAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompareHashAdapter],
    }).compile();

    service = module.get<CompareHashAdapter>(CompareHashAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
