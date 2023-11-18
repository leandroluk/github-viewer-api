import { Test, TestingModule } from '@nestjs/testing';
import { GetMyProfileController } from './get-my-profile';

describe('GetMyProfileController', () => {
  let controller: GetMyProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetMyProfileController],
    }).compile();

    controller = module.get<GetMyProfileController>(GetMyProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
