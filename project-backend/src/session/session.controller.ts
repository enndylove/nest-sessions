import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('id')
  async sessionId() {
    return this.sessionService.generateSessionId();
  }

  @Get('device')
  async deviceInfo(@Req() req: Request) {
    return this.sessionService.getDeviceInfo(req);
  }
}
