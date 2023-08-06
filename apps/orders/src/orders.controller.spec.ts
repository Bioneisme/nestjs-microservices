import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { AUTH_SERVICE } from '@app/common/auth/services';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: {} },
        {
          provide: BILLING_SERVICE,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: AUTH_SERVICE,
          useValue: {},
        },
      ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(ordersController).toBeDefined();
    });
  });
});
