import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AppErrors from 'src/constants/errors';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async check(userId: string) {
    const result = await this.prisma.user.findUnique({ where: { id: userId } });

    if (result) {
      return true;
    } else {
      Logger.log(AppErrors.USER_NOT_FOUND, UserExistsGuard.name);
      throw new NotFoundException();
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
