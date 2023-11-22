import { Test, TestingModule } from '@nestjs/testing';
import { EditMyUserController } from './edit-my-user';

describe('EditMyUserController', () => {
  let controller: EditMyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditMyUserController],
    }).compile();

    controller = module.get<EditMyUserController>(EditMyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
