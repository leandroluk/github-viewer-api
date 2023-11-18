import { Test, TestingModule } from '@nestjs/testing';

import { GetGithubUserRemote } from './get-github-user-remote';

describe('GetUserGithubRemote', () => {
  let service: GetGithubUserRemote;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetGithubUserRemote],
    }).compile();

    service = module.get<GetGithubUserRemote>(GetGithubUserRemote);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
