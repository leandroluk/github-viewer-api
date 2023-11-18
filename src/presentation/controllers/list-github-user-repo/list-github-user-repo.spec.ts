import { Test, TestingModule } from '@nestjs/testing';
import { ListGithubUserRepoController } from './list-github-user-repo';

describe('ListGithubUserRepoController', () => {
  let controller: ListGithubUserRepoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListGithubUserRepoController],
    }).compile();

    controller = module.get<ListGithubUserRepoController>(ListGithubUserRepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
