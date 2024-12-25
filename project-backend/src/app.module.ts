import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { SessionModule } from './session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [AppController, SessionController],
  providers: [AppService, SessionService],
})
export class AppModule {}
