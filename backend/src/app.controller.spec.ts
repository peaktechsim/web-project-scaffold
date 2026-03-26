import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getInfo', () => {
    it('should return status ok with project name', () => {
      const result = appController.getInfo();
      expect(result).toEqual({ status: 'ok', name: 'web-project-scaffold' });
    });
  });
});
