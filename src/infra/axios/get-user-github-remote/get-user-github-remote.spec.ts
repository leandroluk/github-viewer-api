import { Test, TestingModule } from '@nestjs/testing';

import { GetUserGithubRemote } from './get-user-github-remote';

describe('GetUserGithubRemote', () => {
  let service: GetUserGithubRemote;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserGithubRemote],
    }).compile();

    service = module.get<GetUserGithubRemote>(GetUserGithubRemote);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
