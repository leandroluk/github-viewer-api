import { Test, TestingModule } from '@nestjs/testing';
import { EditUserTask } from './edit-user';

describe('EditUserTask', () => {
  let service: EditUserTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditUserTask],
    }).compile();

    service = module.get<EditUserTask>(EditUserTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
