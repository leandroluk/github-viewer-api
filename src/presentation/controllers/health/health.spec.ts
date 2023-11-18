import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health';

describe('HealthController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "health"', () => {
      expect(appController.get()).toBe('health');
    });
  });
});
