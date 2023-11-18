import { Test, TestingModule } from '@nestjs/testing';
import { GetGithubUserController } from './get-github-user';

describe('GetGithubUserController', () => {
  let controller: GetGithubUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGithubUserController],
    }).compile();

    controller = module.get<GetGithubUserController>(GetGithubUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
