import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginUserRequest } from './users/dto/login-user.request';
import { validateOrReject, ValidationError } from 'class-validator';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const login = new LoginUserRequest();
    const errors = [];

    Object.keys(body).forEach(key => {
      login[key] = body[key];
    });

    try {
      await validateOrReject(login);
    } catch (errs) {
      errs.forEach((error: ValidationError) => {
        Object.values(error.constraints).forEach(constraint =>
          errors.push(constraint),
        );
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
