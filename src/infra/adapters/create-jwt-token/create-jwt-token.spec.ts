import { Test, TestingModule } from '@nestjs/testing';
import { CreateJwtTokenAdapter } from './create-jwt-token';

describe('CreateJwtTokenAdapter', () => {
  let service: CreateJwtTokenAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateJwtTokenAdapter],
    }).compile();

    service = module.get<CreateJwtTokenAdapter>(CreateJwtTokenAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
