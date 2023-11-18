import { Test, TestingModule } from '@nestjs/testing';
import { VerifyJwtTokenAdapter } from './verify-jwt-token';

describe('VerifyJwtTokenAdapter', () => {
  let service: VerifyJwtTokenAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyJwtTokenAdapter],
    }).compile();

    service = module.get<VerifyJwtTokenAdapter>(VerifyJwtTokenAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
