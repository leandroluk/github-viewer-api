import { Test, TestingModule } from '@nestjs/testing';

import { ListGithubUserRepoRemote } from './list-github-user-repo-remote';

describe('ListGithubUserRepoRemote', () => {
  let service: ListGithubUserRepoRemote;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListGithubUserRepoRemote],
    }).compile();

    service = module.get<ListGithubUserRepoRemote>(ListGithubUserRepoRemote);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
