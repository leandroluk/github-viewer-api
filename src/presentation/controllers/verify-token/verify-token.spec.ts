import { Test, TestingModule } from '@nestjs/testing';
import { VerifyTokenController } from './verify-token';

describe('VerifyTokenController', () => {
  let controller: VerifyTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyTokenController],
    }).compile();

    controller = module.get<VerifyTokenController>(VerifyTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
