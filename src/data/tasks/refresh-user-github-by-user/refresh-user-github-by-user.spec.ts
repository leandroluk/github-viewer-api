import { Test, TestingModule } from '@nestjs/testing';
import { RefreshUserGithubByUserTask } from './refresh-user-github-by-user';

describe('RefreshUserGithubByUserTask', () => {
  let service: RefreshUserGithubByUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshUserGithubByUserTask],
    }).compile();

    service = module.get<RefreshUserGithubByUserTask>(RefreshUserGithubByUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
