import { Module } from '@nestjs/common';
import { AdopterApplicationService } from './adopter_application.service';
import { AdopterApplicationController } from './adopter_application.controller';

@Module({
  providers: [AdopterApplicationService],
  controllers: [AdopterApplicationController]
})
export class AdopterApplicationModule {}
