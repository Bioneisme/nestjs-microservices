import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { AUTH_SERVICE } from '@app/common/auth/services';
import { RmqService } from '@app/common';

describe('BillingController', () => {
  let billingController: BillingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [
        BillingService,
        { provide: RmqService, useValue: {} },
        {
          provide: AUTH_SERVICE,
          useValue: {},
        },
      ],
    }).compile();

    billingController = app.get<BillingController>(BillingController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(billingController).toBeDefined();
    });
  });
});
