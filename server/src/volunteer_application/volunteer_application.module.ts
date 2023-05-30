import { Module } from '@nestjs/common';
import { VolunteerApplicationService } from './volunteer_application.service';
import { VolunteerApplicationController } from './volunteer_application.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VolunteerApplication } from './volunteer_application.model';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [VolunteerApplicationService],
  controllers: [VolunteerApplicationController],
  imports: [
    SequelizeModule.forFeature([VolunteerApplication]),
    UserModule
  ],
  exports: [
    VolunteerApplicationService
  ]
})
export class VolunteerApplicationModule {}
