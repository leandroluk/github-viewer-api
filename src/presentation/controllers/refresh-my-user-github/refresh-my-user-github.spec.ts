import { Test, TestingModule } from '@nestjs/testing';
import { RefreshMyGithubProfileController } from './refresh-my-user-github';

describe('RefreshMyGithubProfileController', () => {
  let controller: RefreshMyGithubProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshMyGithubProfileController],
    }).compile();

    controller = module.get<RefreshMyGithubProfileController>(RefreshMyGithubProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
