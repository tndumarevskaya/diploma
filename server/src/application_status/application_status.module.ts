import { Module } from '@nestjs/common';
import { ApplicationStatusController } from './application_status.controller';
import { ApplicationStatusService } from './application_status.service';
import { ApplicationStatus } from './application_status.model';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ApplicationStatusController],
  providers: [ApplicationStatusService],
  imports: [
    SequelizeModule.forFeature([ApplicationStatus]),
    UserModule
  ],
  exports: [
    ApplicationStatusService
  ]
})
export class ApplicationStatusModule {}
