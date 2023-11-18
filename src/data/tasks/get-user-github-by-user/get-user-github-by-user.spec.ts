import { Test, TestingModule } from '@nestjs/testing';
import { GetUserGithubByUserTask } from './get-user-github-by-user';

describe('GetUserGithubByUserTask', () => {
  let service: GetUserGithubByUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserGithubByUserTask],
    }).compile();

    service = module.get<GetUserGithubByUserTask>(GetUserGithubByUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
