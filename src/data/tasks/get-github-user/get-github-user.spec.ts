import { Test, TestingModule } from '@nestjs/testing';
import { GetGithubUserTask } from './get-github-user';

describe('GetGithubUserTask', () => {
  let service: GetGithubUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetGithubUserTask],
    }).compile();

    service = module.get<GetGithubUserTask>(GetGithubUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
