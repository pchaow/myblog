import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('status',() => {
    it('should return status "OK"', () => {
      expect(appController.getStatus()).toBe("OK");
    })

    it('should not return "NOT OK"', () => {
      jest.spyOn(appController,'getStatus').mockImplementation(()=>"NOT OK");
      expect(appController.getStatus).toBe("OK");
    })
  })

});
