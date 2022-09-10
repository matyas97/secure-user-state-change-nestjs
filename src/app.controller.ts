import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('live-check')
  liveCheck() {
    return this.appService.liveCheck();
  }
}
