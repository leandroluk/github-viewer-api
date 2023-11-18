import { Test, TestingModule } from '@nestjs/testing';
import { AddUserTask } from './add-user';

describe('AddUserTask', () => {
  let service: AddUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddUserTask],
    }).compile();

    service = module.get<AddUserTask>(AddUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
