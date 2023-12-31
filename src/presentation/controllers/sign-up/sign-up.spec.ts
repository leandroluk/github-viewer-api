import { Test, TestingModule } from '@nestjs/testing';
import { SignUpCase } from './sign-up';

describe('SignUpController', () => {
  let controller: SignUpCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpCase],
    }).compile();

    controller = module.get<SignUpCase>(SignUpCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
