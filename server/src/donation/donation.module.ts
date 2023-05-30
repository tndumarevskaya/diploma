import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { Donation } from './donation.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [DonationService],
  controllers: [DonationController],
  imports: [
    SequelizeModule.forFeature([Donation])
  ],
  exports: [
    DonationService
  ]
})
export class DonationModule {}
