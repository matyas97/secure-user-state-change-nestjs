import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AppErrors from 'src/constants/errors';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserAlreadyCreated implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async check(userId: string) {
    const result = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!result) {
      return true;
    } else {
      Logger.log(AppErrors.USER_CREATED, UserAlreadyCreated.name);
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'User with this id already created.',
          error: AppErrors.USER_CREATED,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.uid;

    return this.check(userId);
  }
}
