import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  liveCheck() {
    return { status: 'RUNNING' };
  }
}
