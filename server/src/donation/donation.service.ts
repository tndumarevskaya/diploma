import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Donation } from './donation.model';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation)
    private donationModel: typeof Donation,
  ) {}

  async createDonation(dto: CreateDonationDto): Promise<Donation> {
    console.log(dto);
    return await this.donationModel.create(dto);
  }

  async getAllDonation(): Promise<Donation[]> {
    return await this.donationModel.findAll();
  }

  async getDonationById(id: number): Promise<Donation> {
    return await this.donationModel.findByPk(id);
  }
}