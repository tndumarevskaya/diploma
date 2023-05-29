import { Module } from '@nestjs/common';
import { VolunteerApplicationService } from './volunteer_application.service';
import { VolunteerApplicationController } from './volunteer_application.controller';

@Module({
  providers: [VolunteerApplicationService],
  controllers: [VolunteerApplicationController]
})
export class VolunteerApplicationModule {}
