import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailTask } from './get-user-by-email';

describe('GetUserByEmailTask', () => {
  let service: GetUserByEmailTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByEmailTask],
    }).compile();

    service = module.get<GetUserByEmailTask>(GetUserByEmailTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
