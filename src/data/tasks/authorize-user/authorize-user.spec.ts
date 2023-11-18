import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizeUserTask } from './authorize-user';

describe('AuthorizeUserService', () => {
  let service: AuthorizeUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizeUserTask],
    }).compile();

    service = module.get<AuthorizeUserTask>(AuthorizeUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
