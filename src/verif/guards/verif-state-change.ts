import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import AppErrors from 'src/constants/errors';
import VerifStates from 'src/constants/verif-states';
import { PrismaService } from '../../prisma/prisma.service';

const verifStateMap: Map<VerifStates, VerifStates> = new Map([
  [VerifStates.STARTED, VerifStates.FILLED_PERSONAL_INFO],
  [VerifStates.FILLED_PERSONAL_INFO, VerifStates.FILLED_BANK_INFO],
  [VerifStates.FILLED_BANK_INFO, VerifStates.SIGNED],
]);

@Injectable()
export class VerifStateChangeGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async check(userId: string, context: ExecutionContext) {
    const result = await this.prisma.verification.findFirst({
      where: { userId: userId },
    });

    if (!result) throw new NotFoundException();

    const currentState = result.verifState;
    const allowedStateChange = verifStateMap.get(currentState as VerifStates);
    const requestedState = this.reflector.get('state', context.getHandler());

    if (allowedStateChange === requestedState) {
      return true;
    } else {
      Logger.log(AppErrors.VERIF_CHANGE_FORBIDDEN, VerifStateChangeGuard.name);
      throw new ForbiddenException();
    }
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.uid;

    return this.check(userId, context);
  }
}
