import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenTask } from './refresh-token';

describe('RefreshTokenTask', () => {
  let service: RefreshTokenTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenTask],
    }).compile();

    service = module.get<RefreshTokenTask>(RefreshTokenTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
