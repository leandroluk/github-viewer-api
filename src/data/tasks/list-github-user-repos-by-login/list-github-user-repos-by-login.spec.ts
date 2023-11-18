import { Test, TestingModule } from '@nestjs/testing';
import { ListGithubUserReposByLoginTask } from './list-github-user-repos-by-login';

describe('ListGithubUserReposByLoginTask', () => {
  let service: ListGithubUserReposByLoginTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListGithubUserReposByLoginTask],
    }).compile();

    service = module.get<ListGithubUserReposByLoginTask>(ListGithubUserReposByLoginTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
