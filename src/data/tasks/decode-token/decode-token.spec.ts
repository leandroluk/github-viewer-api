import { Test, TestingModule } from '@nestjs/testing';
import { DecodeTokenTask } from './decode-token';

describe('DecodeTokenTask', () => {
  let service: DecodeTokenTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecodeTokenTask],
    }).compile();

    service = module.get<DecodeTokenTask>(DecodeTokenTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
