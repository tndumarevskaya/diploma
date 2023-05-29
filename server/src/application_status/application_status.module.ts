import { Module } from '@nestjs/common';
import { ApplicationStatusController } from './application_status.controller';
import { ApplicationStatusService } from './application_status.service';

@Module({
  controllers: [ApplicationStatusController],
  providers: [ApplicationStatusService]
})
export class ApplicationStatusModule {}
