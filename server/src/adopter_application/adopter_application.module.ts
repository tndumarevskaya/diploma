import { Module } from '@nestjs/common';
import { AdopterApplicationService } from './adopter_application.service';
import { AdopterApplicationController } from './adopter_application.controller';
import { AdopterApplication } from './adopter_application.model';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplicationStatusModule } from 'src/application_status/application_status.module';

@Module({
  providers: [AdopterApplicationService],
  controllers: [AdopterApplicationController],
  imports: [
    SequelizeModule.forFeature([AdopterApplication]),
    UserModule,
    ApplicationStatusModule
  ],
  exports: [
    AdopterApplicationService
  ]
})
export class AdopterApplicationModule {}
